/* jshint esversion: 6 */

// Package imports
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// User-made file imports
const unit_utils = require("./unit_utils");
const sim_utils = require("./sim_utils");

let win;

function createWindow()
{
  win = new BrowserWindow(
  {
      width:1600,
      height:900,
      darkTheme: true,
      frame: true,
      title: 'Test'
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.on('closed', () =>
  {
    win = null;
  });
}

// Load default unit items.
unit_utils.load_default_traits();
unit_utils.load_default_orders();
unit_utils.load_default_attitudes();
unit_utils.load_default_sizes();
unit_utils.load_default_ancestries();
unit_utils.load_default_equipment()
unit_utils.load_default_types();
unit_utils.load_default_experience();

app.on('ready', createWindow);

app.on('window-all-closed', () =>
{
  if(process.platform !== 'darwin')
  {
    app.quit();
  }
});
