import React from 'react';
import { IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonFooter, IonProgressBar } from '@ionic/react';
import { settingsOutline, personCircleOutline} from 'ionicons/icons';
// import { 
//   playSkipBackSharp,
//   playSkipForwardSharp,
// } from 'ionicons/icons';
import './Home.css';
import '../compoments/chevron.svg'
import Words from '../components/Words'

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar className="toolbar">
        <IonButton routerLink="/profile" fill="clear" size="large" color="light">    
          <IonIcon icon={personCircleOutline} />      
        </IonButton>
        <IonButton className="right" routerLink="/settings" fill="clear" size="large" color="light">    
          <IonIcon icon={settingsOutline} />
        </IonButton>
      </IonToolbar>
      <div className="remaining">{ "20" } bars remaining</div>
      <Words></Words>
      <IonProgressBar className="song-bar" value={0.72}></IonProgressBar>
      <IonFooter className="ion-no-border footer">
        <IonToolbar>
          <IonTitle>Footer - No Border</IonTitle>
        </IonToolbar>
    </IonFooter>
    </IonPage>
  );
};

export default Home;
