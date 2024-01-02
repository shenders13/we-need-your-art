import type { MetaFunction } from "@remix-run/cloudflare";
import { Slider, SliderOutput, SliderThumb, SliderTrack} from 'react-aria-components';
import {
  motion,
} from "framer-motion"
import { useMemo, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "We Need Your Art" },
    { name: "description", content: "We Need Your Art. So lets get serious about " },
  ];
};

export default function Index() {
  const [sliderValue, setSliderValue] = useState(30)
  const [estimateTime, setEstimateTime] = useState(1000)
  
  const days = useMemo(() => {
    if (sliderValue === 0) return '-'
    return Math.ceil(estimateTime / sliderValue)
  }, [sliderValue, estimateTime])

  return (
    <motion.div className='w-full min-h-screen flex flex-col'>
      <header className="max-w-screen-2xl mx-auto px-4">
        <div className="pt-4 mb-8 md:mb-16 md:my-16 px-4">
        <h1 className="m-0 text-black text-center text-2xl md:text-7xl text-primary overflow-hidden pb-1">
          We need your art.
        </h1>
        <motion.h2 className="text-center text-black text-xs md:text-xl xl:text-2xl leading-tight font-semibold md:mt-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          So let's figure out how long this fucking thing will take.
        </motion.h2>
        </div>
      </header>
      <main className="max-w-lg mx-auto">
        <div className="flex items-center justify-center">
          <div className="text-5xl md:text-7xl w-48 h-48 rounded-full flex-col flex items-center justify-center border border-8 border-black">
          {days}
          <span className="text-md md:text-lg">days</span>
          </div>
        </div>
        <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12 mt-6">
          {/* Project Length Estimate input */}
          <div>
            <label htmlFor="estimate-time" className="block text-sm font-medium leading-6 text-gray-900">
              How long will this entire project will take?
            </label>
            <div className="mt-2 relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="estimate-time"
                id="estimate-time"
                className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm focus:ring-black  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="e.g 250"
                min="1"
                value={estimateTime}
                onChange={(e) => setEstimateTime(e.target.valueAsNumber)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <span className="text-gray-500 sm:text-sm" id="hours">
                  hours
                </span>
              </div>
            </div>
          </div>
          {/* Hours per week slider */}
          <div className="flex justify-center mt-8">
            <Slider value={sliderValue} className="w-full" maxValue={80} minValue={0} onChange={(val) => {
              setSliderValue(val)
            }}>
              <div className="flex text-black justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">Hours you work per week?</label>
                <SliderOutput className='text-sm font-medium leading-6 text-gray-900'/>
              </div>
              <SliderTrack className="relative w-full h-7">
                {({ state }) => (
                  <>
                    {/* track */}
                    <div className="absolute h-2 top-[50%] translate-y-[-50%] w-full rounded-full bg-black/40" />
                    {/* fill */}
                    <div
                      className="absolute h-2 top-[50%] translate-y-[-50%] rounded-full bg-black"
                      style={{ width: state.getThumbPercent(0) * 100 + '%' }}
                    />
                    <SliderThumb className="h-7 w-7 top-[50%] rounded-full border border-solid border-black bg-black transition dragging:bg-black/85 outline-none focus-visible:ring-2 ring-black" />
                  </>
                )}
              </SliderTrack>
            </Slider>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
