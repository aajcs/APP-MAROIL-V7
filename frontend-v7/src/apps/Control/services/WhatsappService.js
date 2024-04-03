/* eslint-disable lines-between-class-members */
import axios from 'axios'

export class WhatsappService {
  bearerToken =
    'EAAKE4c9SP9EBO4tyvdUqUWUm4xZAKAIQ1poiE71waOJZCzNnJPcnKTkrmZA5dncf1cSKnV7zapHVCY4s75Q3Sw0uhdXoRRi17WFkvTkj9mQRyMgAwxbfgZBeEwo58RO86I55rXu9lWxtnFNC8K5x9Jg6TzjSaXv1XHDk0kd4BGqVRDtSSJXJ9Fl7Oy4l4ZC0A'
  // bearerToken =
  //   'EAAKE4c9SP9EBAGsdeLdLgmItKBsHkbKyrRkkD1oZBAXWl3kpDRHq4cpvDqrymsET57p8beNh87z1v1fNY1MRVoaMtomurWc2YOZA6TaVzv7c60aHUbupp1Y8hG8oL62wmdvjGBQFdIBjZCe8ZBFBrmKEaKvX2EPIjoFpNVJ52Hcep6HouFfb'
  url = 'https://graph.facebook.com/v15.0/106517722367572/messages'
  // bearerToken =
  //   'EAAKE4c9SP9EBANv6bQrdyQUeNHRZBtzlbpAH2oQ9Lslg9wj0VDElzFZBiOaMFZBmzbRzSBwRMELZA3SGeoYPZBEbUGdMxdrJcNd22XEPjZBXsLaJQlHiZBbS6ZAcgE1y1C71K9onRZAhUjU2Xah7FYPU5LRT1g1XWzZAVxxSQ8VWO2w5gSSSU8UicmB0z2UKdUzcMZCTbZCUMX05PAZDZD'
  // url = 'https://graph.facebook.com/v15.0/106517722367572/messages'

  //  baseUrl = 'https://apisaltarrana.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/volumetrias/";

  // baseUrl = "http://localhost:8080/api/volumetrias/";
  // baseUrl = '  https://apisaltarrana.herokuapp.com/api/'

  //  baseUrl = 'https://apisaltarrana.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/volumetrias/";

  create(toValor, nameValor, textValor) {
    const config = {
      headers: {
        authorization: 'Bearer ' + this.bearerToken,
        'Content-Type': 'application/json'
      }
    }
    const data = {
      messaging_product: 'whatsapp',
      to: toValor,
      type: 'template',
      template: {
        name: nameValor,
        language: {
          code: 'es'
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'text',
                text: textValor
              }
            ]
          }
        ]
      }
    }
    return axios.post(this.url, data, config).then((res) => res.data)
  }
  createSolicitudFondo(toValor, nameValor, textValor, textbody) {
    const config = {
      headers: {
        authorization: 'Bearer ' + this.bearerToken,
        'Content-Type': 'application/json'
      }
    }
    const data = {
      messaging_product: 'whatsapp',
      to: toValor,
      type: 'template',
      template: {
        name: nameValor,
        language: {
          code: 'es'
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'text',
                text: textValor
              }
            ]
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: textbody
              }
            ]
          }
        ]
      }
    }
    return axios.post(this.url, data, config).then((res) => res.data)
  }
}
