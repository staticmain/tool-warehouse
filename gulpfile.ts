var gulp = require('gulp');
var sftp = require('gulp-sftp-up4');

const distPath = 'dist/**/*';
gulp.task('sftp-server', function () {
    return gulp.src(distPath).pipe(
        sftp({
            // 远程服务器地址
            host: '127.0.0.1',
            // 服务器管理员名
            user: 'root',
            // 管理员密码
            pass: '1234',
            // ssh端口
            port: 22,
            // 远程文件目录
            remotePath: '/var/www/html/'
        }));
});