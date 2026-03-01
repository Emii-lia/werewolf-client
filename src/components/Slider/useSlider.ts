import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type HookParams = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  stepMeter?: number;
  disabled?: boolean;
}
const useSlider = ({
  max = 100,
  disabled,
  step = 1,
  stepMeter,
  onChange,
  min = 0,
  value
}: HookParams) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [dragValue, setDragValue] = useState(value || 0);
  const [dragStartEvent, setDragStartEvent] = useState<React.MouseEvent<HTMLDivElement> | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null)

  const calculateValue = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
    const newValue = Math.round(min + percentage * (max - min));
    return step ? Math.round(newValue / step) * step : newValue;
  }, [sliderRef, min, max, step]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault()
    setIsDragging(true);
    setDragStartEvent(e);
    const newValue = calculateValue(e.clientX);
    setDragValue(newValue);
    // Donner le focus au slider pour permettre l'utilisation du clavier après le drag
    sliderRef.current?.focus();
  }, [disabled, calculateValue])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || disabled) return;
    e.preventDefault()
    const newValue = calculateValue(e.clientX);
    setDragValue(newValue);
  }, [isDragging, disabled, calculateValue])

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (disabled || !isDragging || !dragStartEvent) return;
    setIsDragging(false);
    onChange?.(dragValue)
    setDragStartEvent(null);
  }, [disabled, isDragging, dragStartEvent, dragValue, onChange]);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovering(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setIsHovering(false);
  }, [disabled]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isDragging) return;
    const newValue = calculateValue(e.clientX);
    setDragValue(newValue);
    onChange?.(newValue);
    sliderRef.current?.focus();
  }, [disabled, calculateValue, onChange, isDragging])


  const getSliderValuePercentage = useCallback(() => {
    if (isDragging) {
      return Math.round(
        ((dragValue - min) / (max - min)) * 100
      )
    }
    return Math.round(
      ((value || 0) - min) / (max - min) * 100
    )
  }, [isDragging, dragValue, value, max, min])

  const sliderMeterArray = useMemo(() => {
    if (!stepMeter) return [];
    const stepCount = min === 0?
      Math.floor((max - min) / stepMeter)
      :Math.floor((max - min) / stepMeter) + 1;
    return Array.from({ length: stepCount + 1 }, (_, i) =>
      Math.max(Math.min(Math.round(i * stepMeter), max), min)
    );
  }, [stepMeter, min, max]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isDragging)
      document.body.style.userSelect = 'none';

    return () => {
      document.body.style.userSelect = '';
    }
  }, [isDragging]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    let newValue = value || 0;
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      newValue = Math.min(max, newValue + step);
    }
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      newValue = Math.max(min, newValue - step);
    }
    else {
      return;
    }
    
    setDragValue(newValue);
    onChange?.(newValue);
  }, [disabled, value, min, max, step, onChange]);

  return {
    sliderRef,
    isDragging,
    isHovering,
    sliderMeterArray,
    dragValue: getSliderValuePercentage(),
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleKeyDown,
  }
}

export default useSlider;