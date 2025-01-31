import { OptionalId } from "mongodb";

export type restauranteModel = OptionalId<{
    nombre: string,
    direccion: string,
    ciudad: string,
    pais: string,
    telefono: string
}>;

export type restaurante = {
    id: string,
    nombre: string,
    direccion: string,
    ciudad: string,
    pais: string,
    telefono: string
}

export type APIPhone = {
    is_valid: boolean
}

export type APIWeather = {
    temp: string
}

export type APITime = {
    hour: string,
    minute: string
}

export type APIGeo = {
    latitude: number,
    longitude: number
}