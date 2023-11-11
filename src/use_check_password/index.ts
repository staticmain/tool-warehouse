/**
 * 检测密码和确认密码是否一致
 */
export function useCheckPassword() {
    const password = ref<string>('');
    const confirmPassword = ref<string>('');

    /**
     * 通过获取两个组件的值，判断是否相同
     */
    const checkPassword = (
        type: 'password' | 'confirmPassword',
        validate?: (value: string) => string | boolean
    ): string | boolean => {
        if (type === 'password') {
            return validate?.(password.value) ?? true;
        }
        if (password.value === confirmPassword.value) {
            return true;
        }
        return '输入的密码不一致';
    };

    return {
        password,
        confirmPassword,
        checkPassword,
    };
}