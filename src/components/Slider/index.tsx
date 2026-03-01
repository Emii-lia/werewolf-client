import useSlider from "@/components/Slider/useSlider";
import { CSSProperties } from "react";
import "./Slider.scss"
import { cn } from "@/lib/utils";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  stepMeter?: number;
  className?: string;
  disabled?: boolean;
  showValue?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}
const Slider = ({
  max = 100,
  min = 0,
  step = 1,
  className,
  size = "md",
  stepMeter,
  showValue,
  disabled,
  value,
  onChange
}: Props) => {
  const {
    isDragging,
    sliderRef,
    sliderMeterArray,
    dragValue,
    isHovering,
    handleMouseDown,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleKeyDown
  } = useSlider({
    step,
    min,
    stepMeter,
    disabled,
    value,
    onChange,
    max
  })
  return (
    <div
      className={cn(
        "Slider",
        className
      )}
    >
      <div
        className={cn(
          "slider-container",
          {
            disabled,
            isDragging,
            isHovering
          },
          size,
        )}
        ref={sliderRef}
        tabIndex={disabled ? -1 : 0}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <div className="slider-track">
          <div
            className="slider-value"
            style={{
              "--value": `${(dragValue ?? value) || 0}%`
            } as CSSProperties}
          />
          <div
            className={cn("slider-thumb", { showValue })}
            style={{
              "--value": `${(dragValue ?? value) || 0}%`
            } as CSSProperties}
            title={
              showValue ? value?.toString() : undefined
            }
            data-value={`${(dragValue ?? value ) || 0}`}
          />
        </div>
      </div>
      {sliderMeterArray && sliderMeterArray.length > 0 && (
        <div className="slider-meters">
          {sliderMeterArray.map((meterValue, index) => (
            <div
              key={index}
              className="slider-meter"
            >
              {meterValue}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Slider;