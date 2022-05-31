// import { ref } from 'vue'
// import type { Ref } from 'vue'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'



export const useUTILs = () => {
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  const toDaysMinutesSeconds = (totalMinutes:number) => {

    totalMinutes = Number(totalMinutes);
    
    const m = totalMinutes % 60;
    const h = Math.floor(totalMinutes / 60);

    const hDisplay = h > 0 ? h : "00";
    const mDisplay = m > 0 ? m : "00";
    
    return hDisplay.toString().padStart(2, '0') + 'h ' + mDisplay.toString().padStart(2, '0') + 'm ';

  }
  

  const formatDuration = (minutes: number) => {
    if ( process.client) {
      return toDaysMinutesSeconds(minutes)
    }
    
  }


  return {
    formatDuration
  }
} 
