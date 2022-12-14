import { useEffect, useState } from 'react';
import { mouseEvent, touchEvent, TCarrosselParams } from '../interfaces';
import './style.css'

export default function Carrossel({ title, livros, setCurrentLivroId, isAdmin, id }: TCarrosselParams) {
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(updateIndex, [prevTranslate])
    useEffect(() => { setPositionByIndex(currentIndex) }, [currentIndex])

    // handle events
    function touchStart(event: any, index: number): void {
        setStartPosition(getPositionX(event));
        setIsDragging(true);
    }

    function touchMove(event: any): void {
        if (isDragging) {
            setCurrentPosition(getPositionX(event));
            setCurrentTranslate(prevTranslate + currentPosition - startPosition);
        }
    }

    function touchEnd(): void {
        setIsDragging(false);
        setPrevTranslate(currentTranslate);
    }
    // handle events

    // move slider
    function updateIndex(): void {
        const [sliderVisibleSize, sliderTrueSize] = getSliderSizes();

        if (isOverTheEdge(sliderVisibleSize, sliderTrueSize)) {
            preventGoingOverTheEdge(sliderVisibleSize, sliderTrueSize)
            return;
        }
        setCurrentIndex(calculateNewIndex(sliderTrueSize))
    }

    function setPositionByIndex(index: number): void {
        const item = document.getElementById(id)?.querySelector('[data-item]');
        if (!item) return;
        const newValue = index * -((item as Element).clientWidth + 12)
        setCurrentTranslate(newValue)
        setPrevTranslate(newValue)
    }

    function preventGoingOverTheEdge(sliderVisibleSize: number, sliderTrueSize: number) {
        const isTooMuchToRight = currentTranslate - sliderVisibleSize < -sliderTrueSize
        if (isTooMuchToRight) {
            setCurrentTranslate(sliderVisibleSize - sliderTrueSize)
            setPrevTranslate(sliderVisibleSize - sliderTrueSize)
        }

        const isTooMuchToLeft = currentTranslate > 20;
        if (isTooMuchToLeft) {
            setCurrentTranslate(0)
            setPrevTranslate(0)
        }
    }
    // move slider

    // auxiliar
    function calculateNewIndex(sliderTrueSize: number) {
        const itemSize = getItemSize(sliderTrueSize);
        let newIndex = Math.floor(-(currentTranslate / itemSize) + 0.5);
        if (newIndex <= 0) newIndex = 0;
        if (newIndex > Object.keys(livros).length - 1) newIndex = Object.keys(livros).length - 1;

        return newIndex;
    }
    
    function isOverTheEdge(sliderVisibleSize: number, sliderTrueSize: number): boolean {
        const isTooMuchToRight = currentTranslate - sliderVisibleSize < -sliderTrueSize
        const isTooMuchToLeft = currentTranslate > 20;
        return (isTooMuchToLeft || isTooMuchToRight) ? true : false;
    }

    function isLast(index: number) {
        const [sliderVisibleSize, sliderTrueSize] = getSliderSizes();
        const itemSize = getItemSize(sliderTrueSize);
        return ((index) * itemSize + itemSize / 2 + sliderVisibleSize > sliderTrueSize)
    }

    function getSliderSizes(): [number, number] {
        const slider = document.getElementById(id)?.querySelector('[data-slider]')
        if (slider) {
            const sliderVisibleSize = (slider as HTMLElement).clientWidth;
            const sliderTrueSize = (slider as HTMLElement).scrollWidth;

            return [sliderVisibleSize, sliderTrueSize]
        }
        return [0, 0]
    }

    function getItemSize(sliderTrueSize: number): number {
        const itemSize = sliderTrueSize / Object.keys(livros).length;
        return itemSize;
    }

    function getPositionX(event: mouseEvent | touchEvent): number {
        return event.type.includes('mouse')
            ? (event as mouseEvent).pageX
            : (event as touchEvent).touches[0].clientX;
    }
    // auxiliar

    return (
        <div className='carrossel__container' data-carrossel id={id} >
            <h2 className='carrossel__title'>{title}</h2>
            <div className='slider__arrows'>
                <img
                    src='arrow-left.svg'
                    alt=''
                    className='slider__arrow'
                    style={{
                        pointerEvents: prevTranslate === 0 ? 'none' : 'auto',
                        opacity: prevTranslate === 0 ? '0' : '1'
                    }}
                    onClick={() => { if (currentIndex !== 0) setCurrentIndex(currentIndex - 1) }}
                />
                <img
                    src='arrow-right.svg'
                    alt=''
                    className='slider__arrow'
                    style={{
                        pointerEvents: isLast(currentIndex) ? 'none' : 'auto',
                        opacity: isLast(currentIndex) ? '0' : '1'
                    }}
                    onClick={() => {
                        if (!isLast(currentIndex)) setCurrentIndex(currentIndex + 1)
                    }}
                />
            </div>

            <div className='carrossel__slider'
                style={{
                    transform: `translateX(${currentTranslate}px)`,
                }}
                data-slider
            >
                {livros ? (
                    Object.keys(livros).map((key, index) => (
                        <div key={index}
                            className='slider__item'
                            onTouchStart={(event) => touchStart(event, index)}
                            onMouseDown={(event) => touchStart(event, index)}

                            onTouchMove={(event) => touchMove(event)}
                            onMouseMove={(event) => touchMove(event)}

                            onTouchEnd={() => touchEnd()}
                            onMouseUp={() => touchEnd()}
                            onMouseLeave={() => touchEnd()}

                            onClick={() => { 
                                if (isAdmin)  setCurrentLivroId(key)
                            }}

                            data-item >
                            <div className='slider__description-container'>
                                <p className='slider__description'>{livros[key].description}</p>
                            </div>
                            <img
                                className='slider__img'
                                src={livros[key].imageUrl}
                                alt=''
                                onDragStart={e => e.preventDefault()}
                            />
                            <p className='slider__name'>{livros[key].name}</p>
                        </div>
                    ))) : (
                    <></>
                )}
            </div>

        </div>

    )
}
