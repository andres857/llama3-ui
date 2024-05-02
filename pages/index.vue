<template>
  <div>
    <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="prompt" @keyup.enter="sendText()"/>
  {{ prompt }}
  </div>
  
  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

    <!-- // ACTUALIZAR DATOS ------------------------ -->
    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="sendText()" >Enviar</button>
    {{ responseAPI }}
  </div>
  <div class=" bg-red-500 ">
    {{ responseErrorAPI }}
  </div>

</template>
  
<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const fireworksApiKey = 'JYbfNy3a4SU9KZAVFTNs5gYy9KVwDQAHu6AMnGLKxgq6GBvu';
  const model = 'accounts/fireworks/models/llama-v3-70b-instruct';
  // const prompt = 'Say this is a test';

  const responseAPI = ref<any>([]);
  const responseErrorAPI = ref<any>([]);
  const prompt = ref<any | null>('');

  const config = {
    headers: {
      'Authorization': `Bearer ${fireworksApiKey}`,
      'Content-Type': 'application/json'
    },
    // messages: [
    //   {
    //     "role": "system"
    //   }
    // ],
    // max_tokens: 500,
    // prompt_truncate_len: 1500,
    // temperature: 1,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
    // n: 1,
    // stop: null,
    // response_format: {
    //   "type": "text"
    // },
  };

  const data = {
    model,
    prompt: prompt.value,
    stream: false
  };

  const sendText = async () => {
    try {
      const response = await axios.post('https://api.fireworks.ai/inference/v1/completions', data, config);
    console.log(response);    
      // Manejar la respuesta de la API
      const textChoices = response.data;

      // Dividir la respuesta en líneas
      const lines = textChoices.split('\n');

      // Analizar cada línea como JSON
      const jsonData = lines.map(line => {
        try {
          return JSON.parse(line.replace(/^data: /, ''));
        } catch (error) {
          return null; // Manejar errores de análisis JSON
        }
      });

      console.log(jsonData);
      const responseLLama = jsonData.map( line => {
        if (line !== null ){
          console.log('***');
          console.log(line.id);
          console.log('***');
          return line.choices[0].text;
        }
      })
      console.log('////');
      console.log(responseLLama);
      
      // Agregar las opciones de texto al array de respuesta
      responseAPI.value = responseLLama;
    } catch (error) {
            // Manejar el error
            responseErrorAPI.value = error
      console.error(error);
    }
  }

</script>