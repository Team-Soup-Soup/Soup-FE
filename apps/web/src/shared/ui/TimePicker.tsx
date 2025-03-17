import React, { useState, useEffect, useRef } from 'react';

export default function TimePickerContainer() {
  const [selectedHour, setSelectedHour] = useState<string>('12:00');
  const [selectedAmPm, setSelectedAmPm] = useState<string>('오후');

  const hourRef = useRef<HTMLDivElement>(null);
  const amPmRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 12 }, (_, i) => `${i + 1}:00`);
  const amPmOptions: string[] = ['오전', '오후'];

  useEffect(() => {
    if (hourRef.current) {
      setupScrollBehavior<string>(hourRef.current, hours, setSelectedHour);
    }
    if (amPmRef.current) {
      setupScrollBehavior(amPmRef.current, amPmOptions, setSelectedAmPm);
    }
  }, []);

  const setupScrollBehavior = <T,>(
    element: HTMLElement,
    items: T[],
    setSelectedItem: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    let startY: number, currentIndex: number;
    const itemHeight = 40;

    element.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      currentIndex = Math.floor(element.scrollTop / itemHeight);
    });

    element.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientY - startY;
      let newIndex = currentIndex;

      if (Math.abs(diff) > 10) {
        newIndex = diff > 0 ? currentIndex - 1 : currentIndex + 1;
      }

      newIndex = Math.max(0, Math.min(newIndex, items.length - 1));

      element.scrollTo({
        top: newIndex * itemHeight,
        behavior: 'smooth',
      });

      setSelectedItem(items[newIndex]);
    });

    element.addEventListener('scroll', () => {
      const index = Math.round(element.scrollTop / itemHeight);
      if (index >= 0 && index < items.length) {
        setSelectedItem(items[index]);
      }
    });
  };

  const handleItemClick = <T,>(
    item: T,
    items: T[],
    scrollRef: React.RefObject<HTMLDivElement | null>,
    setSelectedItem: React.Dispatch<React.SetStateAction<T>>,
  ) => {
    const itemHeight = 40;
    const index = items.indexOf(item);

    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        top: index * itemHeight,
        behavior: 'smooth',
      });

      setSelectedItem(item);
    }
  };

  return (
    <div className="text-md rounded-auth border-main-board-border top-13 h-50 w-50 absolute left-0 z-30 flex border-[1px] bg-white p-4 text-center">
      <div className="relative size-full bg-transparent">
        <div className="bg-lock w-49 absolute -left-[14px] top-[40%] h-10" />
        <div className="absolute inset-0 flex">
          <div className="relative h-48 flex-1 overflow-hidden">
            <div
              ref={amPmRef}
              className="scrollbar-hide absolute inset-0 overflow-auto"
              style={{
                scrollBehavior: 'smooth',
                paddingTop: '80px',
                paddingBottom: '80px',
              }}
            >
              {amPmOptions.map((amPm) => (
                <div
                  key={amPm}
                  className={`flex h-10 cursor-pointer items-center justify-center ${selectedAmPm === amPm ? 'text-dark font-semibold' : 'test-light'}`}
                  onClick={() =>
                    handleItemClick(amPm, amPmOptions, amPmRef, setSelectedAmPm)
                  }
                >
                  {amPm}
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-48 flex-1 overflow-hidden">
            <div
              ref={hourRef}
              className="scrollbar-hide absolute inset-0 overflow-auto"
              style={{
                scrollBehavior: 'smooth',
                paddingTop: '80px',
                paddingBottom: '80px',
              }}
            >
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={`flex h-10 cursor-pointer items-center justify-center ${selectedHour === hour ? 'text-dark font-semibold' : 'text-light'}`}
                  onClick={() =>
                    handleItemClick(hour, hours, hourRef, setSelectedHour)
                  }
                >
                  {hour}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
