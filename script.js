const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('app/manager', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/"\/admin/g, '"/manager');
        content = content.replace(/`\/admin/g, '`/manager');
        content = content.replace(/role="admin"/g, 'role="manager"');
        content = content.replace(/userName="Super Admin"/g, 'userName="Manager"');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed', filePath);
    }
});
