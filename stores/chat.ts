import { useRuntimeConfig } from '#app';
import { ref } from 'vue';
import { defineStore } from "pinia";

export const useUbicationsStore = defineStore('ubications', () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const ubications = ref<any[]>([]);

    async function fetchUbicationsbyType(name: string) {
        try {
            const request = await $fetch<any[]>(`${apiBase}/ubications?type=${name}`);
            console.log(request.data);
            
                ubications.value = await Promise.all( request.data.map(async ( ubication:any ) => {
                const cardInfo = {
                    id: ubication.id,
                    name: ubication.name,
                    imageUrl: ubication.imageUrl,
                    location: ubication.location.name,
                    floor: ubication.floor.name,
                    ubicationType: ubication.type.name,
                    description: ubication.Description,
                    qr: ubication.QR,
                }
                return cardInfo;
            }));
        } catch (error) {
            console.error('Error fetching ubications:', error);
        }
    }
    return { ubications, fetchUbicationsbyType };
});
