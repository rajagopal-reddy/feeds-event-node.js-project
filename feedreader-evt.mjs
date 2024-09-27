import {getFeeds, saveFeeds} from './feedmanager.mjs';
import {rl, question, close} from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';
import {EventEmitter} from 'events';


const feeds = await getFeeds();
const parser  = new Parser();

const emitter = new EventEmitter(); 

function prompt() {
  rl.setPrompt('Enter command (list, add, del, read, quit): ');
  rl.prompt();
}

rl.on('line', async (input) => {
  let cmdParts  = input.trim().split(' ');
  emitter.emit(cmdParts[0], cmdParts[1]);
});

emitter.on('quit', async() => {
  await saveFeeds(feeds);
  close();
});

emitter.on('list', async() => {
  feeds.forEach((url, index) => {
    console.log(`${index}\t ${url}`);
  })
  prompt();
});

emitter.on('add', async(url) => {
  if (url === undefined) {
    console.log('invalid command');
  } else {
    feeds.push(url);
  }
  prompt();
});

emitter.on('del', async(index) => {
  if (index === undefined) {
    console.log('invalid command');
  } else {
    index = parseInt(index, 10);
    if (index > -1 && index < feeds.length) {
      feeds.splice(index, 1);
    } else {
        console.log('invalid index');
    }
  }
  prompt();
});

emitter.on('read', async(index) => {
  if (index === undefined) {
    console.log('invalid command');
  } else {
    index = parseInt(index, 10);
    if (index > -1 && index < notes.length) {
      let {data} = await axios.get(feeds);
      let feed = await parser.parseString(data);
      feed.items.forEach((item) => console.log(`${item.title}`));
    }else {
      console.log('invalid index');
    }
 }
  prompt();
});

prompt();





// while (input !== 'quit') {
//   let cmdParts = input.trim().split(' ');
//   let cmd = cmdParts[0];

//   if (cmd === 'list') {
//     notes.forEach((note, index) => console.log(`${index}\t ${note}`));
//   }

//   if (cmd === 'add') {
//     if (cmdParts.length < 2) {
//       console.log('invalid command');
//     } else {
//       notes.push(cmdParts[1]);
//     }
//   }

//   if (cmd === 'del') {
//     if (cmdParts.length < 2) {
//       console.log('invalid command');
//     } else {
//       let index = parseInt(cmdParts[1], 10);
//       if (index > -1 && index < notes.length) {
//         notes.splice(index, 1);
//       } else {
//         console.log('invalid index');
        
//       }
//     }
//   }

//   if (cmd === 'read') {
//     if (cmdParts.length < 2) {
//       console.log('invalid command');
//     } else {
//       let index = parseInt(cmdParts[1], 10);
//       if (index > -1 && index < notes.length) {
//       let {data} = await axios.get('https://www.reddit.com/r/node.rss');

//       let note = await parser.parseString(data);
//       note.items.forEach((item) => console.log(`${item.title}`));
//     }else {
//       console.log('invalid index');
        
//     }
//   }
// }

//   input = await question('Enter command (list, add, del, read, quit): '); 
// }

