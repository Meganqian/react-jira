import { useEffect, useState } from "react";

export const isFalsy = (value: unknown):boolean => value === 0 ? false : !value
// 或者写成
// export const isFalsy = (value: any) => boolean = (value) => {return value === 0 ? false : !value}
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === '';
// let a: object
// a = {name: 'jack'}
// a = () => {
// }
// a = new RegExp('')
//
// let b: { [key: string]: unknown }
// b = {name: 'Jack'}
// b = () => {}
// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
    // Object.assign({}, object)
    const result = { ...object };
    Object.keys(result).forEach(key => {
      const value = result[key];
      if (isVoid(value)) {
        delete result[key];
      }
    });
    return result;
  };

export const useMount = (callback:()=>void)=>{
    useEffect(()=>{
        callback()
        // TODO 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}

export const useDebounce = <V>(value:V, delay?:number) => {
    // 定义一个内部state hook来对传入进来的参数value进行管理
    const [debounceValue, setDebounceValue] = useState(value);
    // 每当输入框传入的value变化时，Effect hook就会设置一个定时器，
    // 在delay时间后操作state hook更新从外界传入的debounceVlue中的value值，
    // 当此定时器执行完毕后 Effect再清理定时器 最后将处理后的value return出去
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue;
}

export const useArray = <T> (initialArray:T[]) => {
    const [value,setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add:(item:T) => setValue([...value,item]),
        clear:()=> setValue([]),
        removeIndex:(index:number) => {
            const copy = [...value]
            copy.splice(index,1)
            setValue(copy)
        }
    }
}


export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true) => {
	const oldTitle = document.title
	useEffect(()=>{
		document.title = title
	},[title])
	
	useEffect(()=>{
		return () => {
			if(!keepOnUnmount){
				document.title = oldTitle
			}
		}
  	})
}