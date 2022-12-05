import React, { useEffect, useState } from 'react';
import { iCarrosselParams } from './interfaces';
import './style.css'

type mouseEvent = React.MouseEvent<HTMLImageElement>
type touchEvent = React.TouchEvent<HTMLImageElement>

export default function Carrossel({ carrossel }: iCarrosselParams) {
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(updateIndex, [prevTranslate])

    useEffect(() => { setPositionByIndex(currentIndex) }, [currentIndex])

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

    function updateIndex() {
        const slider = document.querySelector('[data-slider]')
        const sliderVisibleSize = (slider as HTMLElement).clientWidth;
        const sliderTrueSize = (slider as HTMLElement).scrollWidth

        if (isOverTheEdge(sliderVisibleSize, sliderTrueSize)) {
            preventGoingOverTheEdge(sliderVisibleSize, sliderTrueSize)
            return;
        }
        setCurrentIndex(calculateNewIndex(sliderTrueSize))
    }

    function setPositionByIndex(index: number): void {
        const item = document.querySelector('[data-item]');
        const newValue = index * -((item as Element).clientWidth + 12)
        setCurrentTranslate(newValue)
        setPrevTranslate(newValue)
    }

    function isOverTheEdge(sliderVisibleSize: number, sliderTrueSize: number): boolean {
        const isTooMuchToRight = currentTranslate - sliderVisibleSize < -sliderTrueSize
        const isTooMuchToLeft = currentTranslate > 20;
        return (isTooMuchToLeft || isTooMuchToRight) ? true : false;
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

    function calculateNewIndex(sliderTrueSize: number) {
        const itemSize = sliderTrueSize / carrossel.items.length;
        let newIndex = Math.floor(-(currentTranslate / itemSize) + 0.5);
        if (newIndex <= 0) newIndex = 0;
        if (newIndex > carrossel.items.length - 1) newIndex = carrossel.items.length - 1;

        return newIndex;
    }

    return (
        <div className='carrossel__container' data-carrossel >
            <h2 className='carrossel__title'>{carrossel.title}</h2>
            <div className='slider__arrows'>
                <img
                    src='arrow-left.svg'
                    alt=''
                    className='slider__arrow'
                    style={{
                        pointerEvents: prevTranslate === 0 ? 'none' : 'auto',
                        opacity: prevTranslate === 0 ? '0' : '1'
                    }}
                    onClick={() => {if (currentIndex !== 0) setCurrentIndex(currentIndex - 1)}}
                />
                <img
                    src='arrow-right.svg'
                    alt=''
                    className='slider__arrow'
                    style={{
                        pointerEvents: prevTranslate === carrossel.items.length - 1 ? 'none' : 'auto',
                        opacity: prevTranslate === carrossel.items.length - 1 ? '0' : '1'
                    }}
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                />
            </div>

            <div className='carrossel__slider'
                style={{
                    transform: `translateX(${currentTranslate}px)`,
                }}
                data-slider
            >
                {carrossel.items.map((item, index) => (
                    <div key={index}
                        className='slider__item'
                        onTouchStart={(event) => touchStart(event, index)}
                        onMouseDown={(event) => touchStart(event, index)}

                        onTouchMove={(event) => touchMove(event)}
                        onMouseMove={(event) => touchMove(event)}

                        onTouchEnd={() => touchEnd()}
                        onMouseUp={() => touchEnd()}
                        onMouseLeave={() => touchEnd()}
                        data-item >
                        <img
                            className='slider__img'
                            src={item.imageUrl}
                            alt=''
                            onDragStart={preventDragImageEvent}
                        />
                        <div className='slider__description-container'>
                            <p className='slider__name'>{item.name}</p>
                            <p className='slider__description'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>

    )
}

function preventDragImageEvent(event: React.DragEvent<HTMLImageElement>): void {
    event.preventDefault();
}

function getPositionX(event: mouseEvent | touchEvent): number {
    return event.type.includes('mouse')
        ? (event as mouseEvent).pageX
        : (event as touchEvent).touches[0].clientX;
}