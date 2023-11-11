/** api返回值基本对象类型 */
export interface ApiResultBase<T> {
    // 状态码
    code: number;
    // 提示信息
    message: string;
    // 数据
    data: T;
}

/** 检测类型 */
export enum CheckState {
    // 不显示提示信息
    None = 'none',
    // 错误时显示
    Error = 'error',
    // 正确或错误都显示
    All = 'all',
}

/** 检测配置 */
export interface CheckConfig {
    // 模块名称
    moduleName: string;
    // 检测类型
    checkState: CheckState;
    // 请求成功的提示
    successTip?: string;
    // 请求失败的提示
    errorTip?: string;
    // 请求操作
    operation?: ApiOperations;
}

/** api 操作 */
export enum ApiOperations {
    /** 获取数据 */
    Get = 'get',
    /** 编辑数据 */
    Edit = 'edit',
    /** 删除数据 */
    Delete = 'delete',
    /** 校验数据 */
    Check = 'check',
    /** 新增数据 */
    Add = 'add',
    /** 更新数据 */
    Update = 'update',
    /** 移动数据 */
    Move = 'move',
    /** 复制数据 */
    Copy = 'copy',
    /** 导入数据 */
    Import = 'import',
    /** 导出数据 */
    Export = 'export',
    /** 连接 */
    Connect = 'connect',
    /** 断开连接 */
    Disconnect = 'disconnect',
}

/** api 操作文案 */
export const apiOperationsText = {
    [ApiOperations.Get]: '获取',
    [ApiOperations.Edit]: '编辑',
    [ApiOperations.Delete]: '删除',
    [ApiOperations.Check]: '校验',
    [ApiOperations.Add]: '新增',
    [ApiOperations.Update]: '更新',
    [ApiOperations.Move]: '移动',
    [ApiOperations.Copy]: '复制',
    [ApiOperations.Import]: '导入',
    [ApiOperations.Export]: '导出',
    [ApiOperations.Connect]: '连接',
    [ApiOperations.Disconnect]: '断开连接',
};

/** 统一格式的请求提示 */
export const useApiCheck = () => {
    const baseConfig = {
        moduleName: '',
        checkState: CheckState.Error,
        successTip: '',
        errorTip: '',
        operation: ApiOperations.Get,
    };

    const apiSuccessTips = (moduleName: string, operation?: ApiOperations, successTips?: string) => {
        if (operation) {
            return `${moduleName + apiOperationsText[operation]}成功`;
        }
        return successTips || '操作成功';
    };

    const apiErrorTips = (moduleName: string,operation?: ApiOperations, errorTips?: string) => {
        if (operation) {
            return `${moduleName + apiOperationsText[operation]}失败`;
        }
        return errorTips || '操作失败';
    };

    const apiCheck = async <T>(api: Promise<ApiResultBase<T>>, config: CheckConfig): Promise<ApiResultBase<T>>  => {
        
        // 前提api的结果不能异常，需要在axios或其他ajax库做统一异常处理
        const result = await api;
        const { moduleName, checkState, successTip, errorTip, operation } = { ...baseConfig, ...config };
        
        // <可选逻辑> 如果请求是取消的，则直接返回，不做提示
        // if (result.code === 0) {
        //     return result;
        // }

        if (checkState === CheckState.None) {
            return result;
        }

        if (result.code !== 0) {
            // 提示报错
            apiErrorTips(moduleName, operation, successTip);
            return result;
        }
        if (checkState !== CheckState.All) {
            return result;
        }
        // 提示成功
        apiSuccessTips(moduleName, operation, successTip);
        return result;
    }

    return {
        apiCheck,
        apiSuccessTips,
        apiErrorTips
    }
}