import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import CustomTaskList from './components/CustomTaskList/CustomTaskList';

const PLUGIN_NAME = 'WhisperPlugin';

export default class WhisperPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {

    //ubicaciones de los archivos de audio para el ring
    let alertSound = new Audio("https://magnolia-pike-9849.twil.io/assets/ringtones-old-telephone2.mp3");
    let castanSound = new Audio("https://magnolia-pike-9849.twil.io/assets/CastanSoung.mp3");
    let kuckOverflow = new Audio("https://magnolia-pike-9849.twil.io/assets/Kuck%20Overflow.mp3");
    let kuckEnglish = new Audio("https://magnolia-pike-9849.twil.io/assets/Kuck%20English.mp3");
    let kuckSpanish = new Audio("https://magnolia-pike-9849.twil.io/assets/Kuck%20Espa%C3%B1ol.mp3");
    let ultimSound = new Audio("https://magnolia-pike-9849.twil.io/assets/ultimring.mp3");
    let schnyderSound = new Audio ("https://magnolia-pike-9849.twil.io/assets/Schnyder_calling.mp3");
    let cruzGASound = new Audio("https://assets-7475.twil.io/Cruz_GA_calling.mp3");
    let cruzAZSound = new Audio("https://assets-7475.twil.io/Cruz_AZ_calling.mp3");
    let colteSound = new Audio("https://assets-7475.twil.io/coltefinanciera%20ring.mp3");
    let ultimHoly = new Audio("https://assets-7475.twil.io/Ultim%20Holidays%20campaign.mp3");
    let ultimHolySms = new Audio("https://assets-7475.twil.io/Ultim%20Holidays%20campaign%20sms%20simply.mp3");
    let balanceSound = new Audio("https://assets-7475.twil.io/Balance%20calling.mp3");
    
    //Activar loo para que el ring se repita 
    alertSound.loop = true;
    castanSound.loop = true;
    kuckOverflow.loop = true;
    kuckEnglish.loop = true;
    kuckSpanish.loop = true;
    ultimSound.loop = true;
    schnyderSound.loop = true;
    cruzGASound.loop = true;
    cruzAZSound.loop = true;
    colteSound.loop = true;
    ultimHoly.loop = true;
    ultimHolySms.loop = false;
    balanceSound.looo=true;


    const resStatus = ["accepted","canceled","rejected","rescinded","timeout"];

    // Definir Caller ID para la cola específica "WQde7dabe61d9745592ba450b66c83d3fe" y el Caller ID predeterminado
    const callerIds = {
      "WQ30f904e2e969ce536e4d305bf7189298": "+576045012121",// Caller ID Coltefinanciera
      "WQb8d7c114087e8cb7175eb49938417c2a": "+14704606175", // Caller ID Castan & Lecca
      "WQfb1db8b94483732dd0481681884a1c14": "+14706610773", // KUCK Overflow
      "WQ20fa4fbd552a7d91e29ff39ad12fa7d0": "+14709441441", //Nick Schnyder
      "WQ18c709e64bf6611a9437e31bb4514111": "+14706603487", //KUCK English
      "WQ092939f3a94214a3fc7d49cd165c1ad6": "+14706604187", //KUCK Español	
      "WQ2d294f39d1004932f25c195a96bba9cd": "+14708236928", //Cruz GA
      "WQ16e0637f22107ec874d784e8343a279f": "+14804701418", //Cruz AZ
      "WQe83cbb6ac0deb74f27166a392dcdde45": "+14709446317", //Ultim Holidays
      "WQ0ca44bd2a3a0efd6cbac881d794ffbec": "+14709447020", //Balance Dentistry
      default: "+14709448845"  // Caller ID por defecto para todas las demás colas
    };

    // Función para obtener el Caller ID basado en el ID de la cola
// Función para obtener el Caller ID basado en el ID de la cola
    const getCallerId = (queueSid) => {
      if (queueSid) {
        console.log(`Queue SID: ${queueSid}`); // Log para depuración
        return callerIds[queueSid] || callerIds.default;
      }
      console.log("No queue SID found, using default Caller ID.");
      return callerIds.default;
    };

    //Difinir dinamicamente el ring a sonar para las llamadas entrantes
    manager.workerClient.on("reservationCreated", function(reservation) {
      if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Assign to Anyone"
      ) {
          alertSound.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Castan & Lecca" 
      )
      {
        castanSound.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "KUCK Overflow" 
      )
      {
        kuckOverflow.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "KUCK English" 
      )
      {
        kuckEnglish.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "KUCK Español" 
      )
      {
        kuckSpanish.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "UltimMarketing" 
      )
      {
        ultimSound.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Nick Schnyder" 
      )
      {
        schnyderSound.play();
      } else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Cruz GA" 
      )
      {
        cruzGASound.play();
      }  else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Cruz GA" 
      )
      {
        cruzAZSound.play();
      }else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Coltefinanciera" 
      )
      {
        colteSound.play();
      }else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Ultim Holidays SMS" 
      )
      {
        ultimHoly.play();
      }else if (
        reservation.task.taskChannelUniqueName === "voice" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Balance" 
      )
      {
        balanceSound.play(); 
      }else if (
        reservation.task.taskChannelUniqueName === "sms" &&
        reservation.task.attributes.direction === "inbound" && 
        reservation.task.workflowName === "Ultim Holidays SMS" 
      )
      {
        ultimHolySms.play();
      }
      resStatus.forEach((e) => {
        reservation.on(e, () => {
          alertSound.pause();
          castanSound.pause();
          kuckOverflow.pause();
          kuckEnglish.pause();
          kuckSpanish.pause();
          ultimSound.pause();
          schnyderSound.pause();
          cruzAZSound.pause();
          cruzGASound.pause();
          colteSound.pause();
          ultimHoly.pause();
          ultimHolySms.pause();
          balanceSound.pause();
        });
      });
    });

    // Asignar el Caller ID dinámico antes de realizar una llamada saliente
    flex.Actions.addListener("beforeStartOutboundCall", (payload, abortFunction) => {
      // Obtener el queueSid del payload
      const queueSid = payload.queueSid;

      const callerId = getCallerId(queueSid);
      console.log(`Assigned Caller ID: ${callerId}`); // Log para confirmar el Caller ID asignado
      payload.callerId = callerId;  // Asigna el Caller ID correcto

      console.log("Final Caller ID for the call:", payload.callerId); // Verificar el Caller ID final
    });

     // Actualizar el logo en el encabezado
    flex.MainHeader.defaultProps.logoUrl =
    'https://magnolia-pike-9849.twil.io/assets/ultim-logo%20(1).png';
    
  }
}
