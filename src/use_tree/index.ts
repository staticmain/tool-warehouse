import { ref } from "vue-demi";

/** 默认树节点对象 */
export interface DefaultTreeNode<T> {
    id: string;
    label: string;
    children?: DefaultTreeNode<T>[];
}


/** 遍历树节点，并执行回调函数 */
function forEachNode<T>(node: DefaultTreeNode<T>, callback?: (node: DefaultTreeNode<T>) => void) {
    // 如果有回调函数，则执行
    if (callback) {
        callback(node);
    }

    // 如果节点有子节点，则遍历子节点
    if (node.children) {
        for (const child of node.children) {
            forEachNode(child, callback);
        }
    }
}

export function useTree<T, K = any>() {
    const treeRef = ref<T>();
    const currentNode = ref<DefaultTreeNode<K>>();

    /** 设置当前选中项 */
    function setSelectedNode(node: DefaultTreeNode<K>) {
        currentNode.value = node;
    }

    /** 通过传入的id，找到树是否存在该节点 */
    function findNodeById(nodes: DefaultTreeNode<K>[], id: string) {
        for (const node of nodes) {
            forEachNode(node, (node: DefaultTreeNode<K>) => {
                if (node.id === id) {
                    return nodes;
                }
            });
        }
        return null;
    }

    return {
        treeRef,
        currentNode,
        setSelectedNode,
        findNodeById
    };
}

export function useTreeNode<T>() {
    /** 给树节点添加名称路径 */
    function setNodePath(
        node: DefaultTreeNode<T> | DefaultTreeNode<T>[],
        key: string,
        pathKey = 'nodePath',
        namePath: string[] = [],
    ) {
        const path = [...namePath, node[key]];
        if (Array.isArray(node)) {
            for (const child of node) {
                setNodePath(child, key, pathKey, []);
            }
            return;
        }
        node[pathKey] = path;
        if (Array.isArray(node?.children)) {
            for (const child of node.children) {
                setNodePath(child, key, pathKey, path);
            }
        }
    }

    /** 设置node节点的名称路径 */
    function setNodeNamePath(node: DefaultTreeNode<T> | DefaultTreeNode<T>[], key = 'label', pathKey = 'namePath') {
        setNodePath(node, key, pathKey, []);
    }

    /** 设置node节点的名称路径 */
    function setNodeIDPath(node: DefaultTreeNode<T> | DefaultTreeNode<T>[], key = 'id', pathKey = 'idPath') {
        setNodePath(node, key, pathKey, []);
    }

    return {
        setNodePath,
        setNodeIDPath,
        setNodeNamePath,
    }
}