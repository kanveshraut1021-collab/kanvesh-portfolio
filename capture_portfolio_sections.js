const http = require('http');
const fs = require('fs');
const path = require('path');

// Built-in lightweight WebSocket client for CDP
function getWsDebuggerUrl() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json/list', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const pages = JSON.parse(data);
        if (pages.length > 0 && pages[0].webSocketDebuggerUrl) {
          resolve(pages[0].webSocketDebuggerUrl);
        } else {
          // If no page open, create new target
          http.get('http://127.0.0.1:9222/json/new?http://127.0.0.1:5173', (res2) => {
            let data2 = '';
            res2.on('data', c => data2 += c);
            res2.on('end', () => {
              const p = JSON.parse(data2);
              resolve(p.webSocketDebuggerUrl);
            });
          });
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const wsUrl = await getWsDebuggerUrl();
  console.log('Connecting to WebSocket:', wsUrl);

  const ws = new globalThis.WebSocket(wsUrl);

  let msgId = 1;
  const callbacks = new Map();

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      cb(data);
    }
  });

  const send = (method, params = {}) => {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, (res) => resolve(res.result));
      ws.send(JSON.stringify({ id, method, params }));
    });
  };

  ws.addEventListener('open', async () => {
    console.log('CDP Connected.');

    await send('Page.enable');
    await send('DOM.enable');
    await send('Runtime.enable');

    await send('Page.navigate', { url: 'http://127.0.0.1:5173' });
    await new Promise(r => setTimeout(r, 2500));

    // Helper for evaluating JS
    const evaluate = async (expression) => {
      return await send('Runtime.evaluate', { expression, returnByValue: true });
    };

    // Helper for capturing screenshot
    const capture = async (filename) => {
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = path.join(__dirname, 'temp_screenshots', filename);
      fs.writeFileSync(outPath, Buffer.from(res.data, 'base64'));
      console.log(`Saved screenshot: ${filename}`);
    };

    // 1. Hero
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_01_hero.png');

    // 2. About & Journey
    await evaluate(`document.getElementById('about').scrollIntoView({ behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_02_about.png');

    // 3. Journey & Skills
    await evaluate(`document.getElementById('skills').scrollIntoView({ behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_03_skills.png');

    // 4. Project Showcase: FarmEdge
    await evaluate(`document.getElementById('projects').scrollIntoView({ behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_04_project_farmedge.png');

    // 5. Project Showcase: Click Sai Automobile tab
    await evaluate(`
      const tabs = document.querySelectorAll('#projects button');
      if (tabs[1]) tabs[1].click();
    `);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_05_project_sai.png');

    // 6. Project Showcase: Click Inventory Management tab
    await evaluate(`
      const tabs = document.querySelectorAll('#projects button');
      if (tabs[2]) tabs[2].click();
    `);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_06_project_inventory.png');

    // 7. Contact Section & Form submission test
    await evaluate(`document.getElementById('contact').scrollIntoView({ behavior: 'instant' })`);
    await new Promise(r => setTimeout(r, 600));
    await capture('shot_07_contact_initial.png');

    // Fill form and submit via React
    await evaluate(`
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const subjectInput = document.getElementById('subject');
      const msgInput = document.getElementById('message');

      function setNativeValue(element, value) {
        const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
        
        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else {
          valueSetter.call(element, value);
        }
        element.dispatchEvent(new Event('input', { bubbles: true }));
      }

      setNativeValue(nameInput, 'Kanvesh Recruiter');
      setNativeValue(emailInput, 'recruiter@techventures.io');
      setNativeValue(phoneInput, '+91 9075919023');
      setNativeValue(subjectInput, 'Full Stack Python Developer Role');
      setNativeValue(msgInput, 'Hello Kanvesh, we reviewed your portfolio, FarmEdge, and Sai Automobile live projects. Your Python FastAPI backend and PostgreSQL database integration is outstanding!');
      
      const submitBtn = document.querySelector('#contact form button[type="submit"]');
      if (submitBtn) submitBtn.click();
    `);

    // Wait for submission response from FastAPI & PostgreSQL
    await new Promise(r => setTimeout(r, 2000));
    await capture('shot_08_contact_success.png');

    console.log('All section screenshots captured successfully!');
    ws.close();
    process.exit(0);
  });
}

run().catch(console.error);
