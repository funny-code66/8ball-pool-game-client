import { useState, useEffect } from 'react'

export const getImg = (img) => {
    if (img === undefined)
        return  null;
    return require(`../assets/${img}`).default
}

export const useResize = () => {
    const [screenSize, setScreenSize] = useState({
        width: 0,
        height: 0,
        isMobile: false,
        isResponsive: false
    })

    const updateSize = () => {
        setScreenSize({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobile: window.innerWidth < 768,
            isResponsive: window.innerWidth < 1320
        })
    }

    useEffect(() => {
        window.addEventListener("resize", updateSize)
        updateSize()

        return () => {
            window.removeEventListener("resize", updateSize)
        }
    }, [])

    return screenSize;
}

// export const useDetectOutsideClick = (el, initialState) => {
//     const [isActive, setIsActive] = useState(initialState);

//     useEffect(() => {
//         const onClick = e => {
//             if (el.current !== null && !el.current.contains(e.target)) {
//                 setIsActive(!isActive);
//             }
//         };

//         if (isActive) {
//             window.addEventListener("click", onClick);
//         }

//         return () => {
//             window.removeEventListener("click", onClick);
//         };
//     }, [isActive, el]);

//     return [isActive, setIsActive];
// };

export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))