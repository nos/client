import { Menu } from 'electron';

export default function bindContextMenu(browserWindow) {
  browserWindow.webContents.on('context-menu', (event, params) => {
    const template = [];
    const { isEditable, editFlags } = params;

    if (isEditable) {
      template.push(
        {
          label: 'Undo',
          role: editFlags.canUndo ? 'undo' : '',
          enabled: editFlags.canUndo
        },
        {
          label: 'Redo',
          role: editFlags.canRedo ? 'redo' : '',
          enabled: editFlags.canRedo
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          role: editFlags.canCut ? 'cut' : '',
          enabled: editFlags.canCut
        },
        {
          label: 'Copy',
          role: editFlags.canCopy ? 'copy' : '',
          enabled: editFlags.canCopy
        },
        {
          label: 'Paste',
          role: editFlags.canPaste ? 'paste' : '',
          enabled: editFlags.canPaste
        },
        {
          label: 'Paste and Match Style',
          role: editFlags.canPaste ? 'pasteandmatchstyle' : '',
          enabled: editFlags.canPaste
        },
        {
          label: 'Select All',
          role: editFlags.canSelectAll ? 'selectall' : '',
          enabled: editFlags.canSelectAll
        }
      );
    }

    if (template.length === 0) {
      return;
    }

    const menu = Menu.buildFromTemplate(template);
    menu.popup(browserWindow);
  });
}
