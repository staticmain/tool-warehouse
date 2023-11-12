// 实现一个vue2的自定义指令，用于在获取到权限列表后，判断当前传入的权限名是否在权限列表中，如果不在，则置灰当前的组件，使用ts实现
import { type DirectiveBinding, ref } from 'vue';
import { createGlobalState } from '@vueuse/core';

// 导出一个常量disableClassName，值为字符串'disabled'
export const disableClassName = 'disabled';

// 导出一个名为hasPermission的DirectiveOptions常量，用于判断是否有权限
export const hasPermission = {
    // 当指令被插入到DOM时调用
    inserted(el: HTMLElement, binding: DirectiveBinding<any>) {
        // 如果元素没有父节点，则直接返回
        if (!el.parentNode) return;
        // 获取权限列表
        const permissionList = usePermission().permissionList.value;
        // 如果权限列表中不包含指令的值，则添加disabled类
        if (permissionList && permissionList.indexOf(binding.value) === -1) {
            el.classList.add(disableClassName);
        } else {
            // 否则移除disabled类
            el.classList.remove(disableClassName);
        }
    }
};

// 导出一个全局状态的函数，用于获取权限列表
export const usePermission = createGlobalState(
  () => {
    // state
    // 声明一个权限列表的变量
    const permissionList = ref<string[]>([]);

    // actions
    // 声明一个设置权限列表的函数
    const setPermissionList = (list: string[]) => {
        permissionList.value = list;
    }

    // 返回权限列表和设置权限列表的函数
    return { permissionList, setPermissionList }
  }
);