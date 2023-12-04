import {RefObject, useEffect} from 'react'
import { useSidebarContext } from '../context/BarContext';

const useOutsideClose = (ref:RefObject<HTMLDivElement>) => {
  const { setIsSidebarOpen }=useSidebarContext()

    useEffect(() => {
        function handleClickOutside(event:MouseEvent) {
          if (ref.current && !ref.current.contains(<Node>event.target)) {
            setIsSidebarOpen(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    
    return;
}

export default useOutsideClose