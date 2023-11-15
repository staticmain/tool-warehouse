/**
 * 基础下载方案
 * 认证：前端发起下载预请求，后端通过set-cookie将一个短时间的认证字段设置到浏览器，前端再发起实际下载
 * 注意：不能使用ajax
 */
export function useDownload() {
    /**
     * 使用表单下载
     * @param url 下载地址
     * @param formData 表单数据
     * @param method 请求方式，默认为post
     */
    function useFormDownload(url: string, formData: object, method = 'post') {
        // 创建一个隐藏的表单
        const form = document.createElement('form');
        form.action = url;
        form.method = method;
        form.style.display = 'none';
        form.target = 'download_iframe';

        // 移除原本可能存在的downloadIframe
        const originIframe = document.getElementById('download_iframe');
        if(originIframe) {
            document.body.removeChild(originIframe);
        }

        // 通过iframe下载
        const downloadIframe = document.createElement('iframe');
        downloadIframe.style.display = 'none';
        downloadIframe.name = 'download_iframe';
        downloadIframe.id = 'download_iframe';
        document.body.appendChild(downloadIframe);
        
        // 遍历formData，创建input标签
        for(const key of Object.keys(formData)){
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = formData[key];
            form.appendChild(input);
        }

        // 提交表单
        form.submit();
        form.remove();
    }

    /**
     * 使用链接下载
     * @param url 下载地址
     * @param name 文件名
     */
    function useLinkDownload(url: string, name: string) {
        // 创建一个隐藏的链接
        const link = document.createElement('a');
        link.href = url;
        link.download = name;
        link.style.display = 'none';
        link.click();
    }

    return {
        useFormDownload,
        useLinkDownload
    }
}