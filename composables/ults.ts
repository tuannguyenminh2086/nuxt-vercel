// import { ref } from 'vue'
// import type { Ref } from 'vue'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js'
import relativeTime from 'dayjs/plugin/relativeTime.js'



export const useUTILs = () => {
  dayjs.extend(duration)
  dayjs.extend(relativeTime)

  const toDaysMinutesSeconds = (seconds:number) => {

    seconds = Number(seconds);

    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + ':' : "";
    const hDisplay = h > 0 ? h : "00";
    const mDisplay = m > 0 ? m : "00";
    const sDisplay = s > 0 ? s : "00";
    
    return dDisplay + hDisplay.toString().padStart(2, '0') + 'h ' + mDisplay.toString().padStart(2, '0') + 'm '+ sDisplay.toString().padStart(2, '0') + 's';

  }
  


  const formatDuration = (seconds: number) => {
    if ( process.client) {
      return toDaysMinutesSeconds(seconds)
    }
    
  }


  return {
    formatDuration
  }
} 
