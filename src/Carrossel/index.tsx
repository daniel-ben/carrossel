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

    function touchStart(event: any, index: number): void {
        setCurrentIndex(index);
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

        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -40 && currentIndex < carrossel.items.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setPositionByIndex(currentIndex + 1);
        }
        if (movedBy > 40 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
            setPositionByIndex(currentIndex - 1);
        }

        if (movedBy > 40 && currentIndex === 0) {
            setPositionByIndex(0)
        }

        if (movedBy < -40 && currentIndex === carrossel.items.length - 1) {
            setPositionByIndex(currentIndex)
        }
    }

    function setPositionByIndex(index: number): void {
        const item = document.querySelector('[data-item]');
        const newValue = index * -((item as Element).clientWidth + 12)
        setCurrentTranslate(newValue)
        setPrevTranslate(newValue)
    }

    return (
        <div className='carrossel__container' data-carrossel>
            <h2 className='carrossel__title'>{carrossel.title}</h2>

            <div className='slider__arrows'>
                <img
                    src='arrow-left.svg'
                    alt=''
                    className='slider__arrow'
                />
                <img
                    src='arrow-right.svg'
                    alt=''
                    className='slider__arrow'
                />
            </div>

            <div className='carrossel__slider'
                style={{ transform: `translateX(${currentTranslate}px)` }}
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
                        <p className='slider__description'>{item.description}</p>
                    </div>
                )
                )}
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

function isTooFar(): boolean {
    const slider: HTMLElement | null = document.querySelector('[data-slider]');
    console.log(slider?.clientWidth)
    return false;
}
