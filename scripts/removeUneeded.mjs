import axcSidebar from "../website/sidebars.json";
import axctSidebar from "../axialunar-guide/sidebars.json";
import fs from 'fs';

const Save = [
  "assets"
]

const Languages = [
  "en",
  "ru",
  "zh-CN"
]

const main = () => {
  let sidebar;
  if (process.argv[2] == 'axc') {
    sidebar = axcSidebar;
  } else if (process.argv[2] == 'axct') {
    sidebar = axctSidebar;
  } else {
    throw new Error("Please specifiy `axc` or `axct`.");
  }

  let items = [];
  for (const key of Object.keys(sidebar.docs)) {
    for (const item of sidebar.docs[key]) {
      if (item.ids) {
        items.push(...item.ids);
      } else {
        items.push(item);
      }
    }
  }

  console.log(items);

  const rootDir = process.argv[2] == 'axc' ? 'website/build/AXIA-wiki' : 'axialunar-guide/build/axialunar-guide-hosting';

  const deleteWithin = (folder) => {
    for (const entry of fs.readdirSync(folder)) {
      if (entry.slice(-4) === 'html') {
        //file
        if (items.indexOf(entry.slice(0, -5)) === -1) {
          console.log('DELETE', `${folder}/${entry}`);
          // delete file
          fs.unlinkSync(`${folder}/${entry}`);
        }
      } else {
        //directory
        if (
          items.indexOf(entry) === -1
          && Save.indexOf(entry) === -1
          && Languages.indexOf(entry) === -1
          ) {
          console.log('DELETE', `${folder}/${entry}`);
          //delete directory
          fs.rmdirSync(`${folder}/${entry}`, { recursive: true });
        }
      }
    }
  }

  deleteWithin(rootDir + '/docs')
  for (const language of Languages) {
    deleteWithin(rootDir + '/docs/' + language);
  }


}

main();
