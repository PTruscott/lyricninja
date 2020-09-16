import React from 'react';
import { IonIcon } from '@ionic/react';


interface ChevronsProps {
    enabled: boolean;
    left: boolean;
}


const MainWord: React.FC<ChevronsProps> = ({enabled, left}) => {
    if (left) {
        if (enabled) {
            return(
                <IonIcon className="right chevron" src='data:image/svg+xml;utf8,<svg width="67" height="102" viewBox="0 0 67 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="50.9497" y="101.606" width="72.0537" height="22.6986" transform="rotate(-135 50.9497 101.606)" fill="white"/>
                <rect x="66.7626" y="16.0503" width="70.4294" height="22.6986" transform="rotate(135 66.7626 16.0503)" fill="white"/>
                </svg>' />
            )
        }
        return (
            <IonIcon className="right chevron" src='data:image/svg+xml;utf8,<svg width="67" height="102" viewBox="0 0 67 102" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50.9497" y="101.606" width="72.0537" height="22.6986" transform="rotate(-135 50.9497 101.606)" fill="dimgray"/>
            <rect x="66.7626" y="16.0503" width="70.4294" height="22.6986" transform="rotate(135 66.7626 16.0503)" fill="dimgray"/>
            </svg>' />
        );
    }
    else {
        return (
            <IonIcon className="chevron" src='data:image/svg+xml;utf8,<svg width="67" height="102" viewBox="0 0 67 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="16.0503" width="72.0537" height="22.6986" transform="rotate(45 16.0503 0)" fill="white"/>
                <rect x="0.237427" y="85.5559" width="70.4294" height="22.6986" transform="rotate(-45 0.237427 85.5559)" fill="white"/>
                </svg>' />
        );
    }
  };

export default MainWord;
  