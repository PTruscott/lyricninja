import { useState, useEffect } from "react";

export function rhymeTimer() {

    const [time, setTime] = useState(0);
    
    this.myInterval = setInterval(() => {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }, 1000)

    return time;
  }