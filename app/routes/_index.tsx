import type { MetaFunction } from "@remix-run/cloudflare";
import { Slider, SliderOutput, SliderThumb, SliderTrack} from 'react-aria-components';
import {
  motion,
} from "framer-motion"
import { useEffect, useMemo, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "We Need Your Art" },
    { name: "description", content: "We Need Your Art. So lets get serious about " },
  ];
};

const MAX_HOURS_PER_WEEK = 80
const MAX_WORDS_PER_WEEK = 50000

const DEFAULT_HOURS_PER_WEEK = 30
const DEFAULT_WORDS_PER_WEEK = 10000

export default function Index() {
  const [projectLength, setProjectLength] = useState<number>(150)
  const [mode, setMode] = useState<'hours' | 'words'>('hours')
  const [sliderValue, setSliderValue] = useState(mode === "hours" ? DEFAULT_HOURS_PER_WEEK : DEFAULT_WORDS_PER_WEEK)

  useEffect(() => {
    setSliderValue(mode === "hours" ? DEFAULT_HOURS_PER_WEEK : DEFAULT_WORDS_PER_WEEK)
  }, [mode])
  
  const days = useMemo(() => {
    if (!projectLength) return '-'
    if (sliderValue === 0) return '-'

    return Math.ceil((projectLength / sliderValue) * 7)

  }, [sliderValue, projectLength, mode])

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <header className="max-w-screen-2xl mx-auto px-4">
        <div className="pt-4 mb-8 md:mb-16 md:my-16 px-4">
        <h1 className="m-0 text-black text-center text-3xl md:text-7xl text-primary overflow-hidden pb-1">
          We need your art.
        </h1>
        <motion.h2 className="text-center text-black text-xs md:text-xl xl:text-2xl leading-tight md:font-semibold font-medium md:mt-3 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          So let's figure out how long this fucking thing will take.
        </motion.h2>
        </div>
      </header>
      <motion.main className="max-w-lg mx-auto"
        initial={{opacity: 0, y: -20 }}
        animate={{opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center justify-center">
          <div className="text-5xl md:text-7xl w-36 h-36 md:w-48 md:h-48 border-4 md:border-8 rounded-full flex-col flex items-center justify-center border  border-black">
          {days}
          <span className="text-sm md:text-lg">days</span>
          </div>
        </div>
        <div className="bg-white px-6 py-12 shadow-lg sm:rounded-lg sm:px-12 mt-6">
          {/* Project Length Estimate input */}
          <div>
            <label htmlFor="projectLength" className="block text-sm font-medium leading-6 text-gray-900">
            How long will this entire project will take?
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="number"
                name="projectLength"
                id="projectLength"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Take a rough stab"
                value={projectLength}
                onChange={(e) => setProjectLength(parseInt(e.target.value))}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="hoursOrWords" className="sr-only">
                  How long will this entire project will take?
                </label>
                <select
                  id="hoursOrWords"
                  name="hoursOrWords"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  onChange={(e) => setMode(e.target.value as 'hours' | 'words')}
                  value={mode}
                >
                  <option>hours</option>
                  <option>words</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hours per week slider */}
          <div className="flex justify-center mt-8">
            <Slider 
              value={sliderValue}
              className="w-full"
              maxValue={mode === "hours" ? MAX_HOURS_PER_WEEK : MAX_WORDS_PER_WEEK}
              minValue={0}
              onChange={(val) => setSliderValue(val)}
              >
              <div className="flex text-black justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  {
                    mode === 'hours' ? 'Hours you work per week?' : 'Words you write per week?'
                  }
                </label>
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
      </motion.main>
      <motion.footer className="max-w-screen-2xl mx-auto px-4 flex flex-1 items-end"
        initial={{opacity: 0, y: 20 }}
        animate={{opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <p className="pb-4 text-center text-sm leading-6 text-slate-500">Made with ❤️ by Amie McNee & James Winestock.</p>
      </motion.footer>
    </div>
  );
}
