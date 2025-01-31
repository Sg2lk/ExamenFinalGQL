import { Collection } from "mongodb";
import { APIGeo, APIPhone, APITime, APIWeather, restauranteModel } from "./tps.ts";
import { GraphQLError } from "graphql";
import { ObjectId } from "mongodb";

type context = {
  restaurantes: Collection<restauranteModel>
}

export const resolvers = {
    Query: {
      getRestaurants: async(_: unknown, args: {ciudad: string}, c: context):Promise<restauranteModel[]> => {
        const {ciudad} = args;
        return await c.restaurantes.find({ciudad: ciudad}).toArray();
      },

      getRestaurant: async(_: unknown, args: {id: string}, c: context):Promise<restauranteModel> => {
        const {id} = args;
        return await c.restaurantes.findOne({_id: new ObjectId(id)});
      }
    },

    Mutation: {
      addRestaurant: async(_: unknown, args: {nombre: string, direccion: string, ciudad: string, pais: string, telefono: string}, c: context):
      Promise<restauranteModel> => {

        const {nombre, direccion, ciudad, pais, telefono} = args;

        const phoneExists = await c.restaurantes.findOne({telefono: telefono});
        if(phoneExists) throw new GraphQLError("Phone already exists.");
        
        const API_KEY = "ww1Ngh6Q2v8lqQpQmAd1jQ==Ssc2Vnkkal6v2Sv4";
        if(!API_KEY) throw new GraphQLError("API NINJA invalid");
        const url = `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`;
        const data = await fetch(url, {
          headers: {
            'X-Api-Key': API_KEY
          },
        });
        if(data.status !== 200) throw new GraphQLError("API Ninja error.");
        const res:APIPhone = await data.json();
        if(!res.is_valid) throw new GraphQLError("Invalid phone.");

        const {insertedId} = await c.restaurantes.insertOne({
          nombre,
          direccion,
          ciudad,
          pais,
          telefono
        });

        return {
          _id: insertedId,
          nombre,
          direccion,
          ciudad,
          pais,
          telefono
        };

      },

      deleteRestaurant: async(_: unknown, args: {id: string}, c: context):Promise<boolean> => {

        const {id} = args;
        const {deletedCount} = await c.restaurantes.deleteOne({_id: new ObjectId(id)});
        if(deletedCount === 1) return true;
        return false; 
      }
    },

    Restaurant: {
      id: async(parent: restauranteModel):Promise<string> => {
        return await parent._id!.toString();
      },

      direccion: async(parent: restauranteModel):Promise<string> => {
        return await `${parent.direccion}, ${parent.ciudad}, ${parent.pais}`;
      },

      hora: async(parent: restauranteModel):Promise<string> => {

        const API_KEY = "ww1Ngh6Q2v8lqQpQmAd1jQ==Ssc2Vnkkal6v2Sv4";
        if(!API_KEY) throw new GraphQLError("API NINJA invalid");

        const url1 = `https://api.api-ninjas.com/v1/geocoding?city=${parent.ciudad}&country=${parent.pais}`;
        const data1 = await fetch(url1, {
          headers: {
            'X-Api-Key': API_KEY
          },
        });
        if(data1.status !== 200) throw new GraphQLError("API Ninja error1.");
        const geo: APIGeo[] = await data1.json();
        const lat = geo[0].latitude;
        const lon = geo[0].longitude;
        
        const url = `https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`;
        const data = await fetch(url, {
          headers: {
            'X-Api-Key': API_KEY
          },
        });
        if(data.status !== 200) throw new GraphQLError("API Ninja error2.");

        const res: APITime = await data.json();
        return `${res.hour}:${res.minute}`;
      },

      temperatura: async(parent: restauranteModel):Promise<string> => {

        const API_KEY = "ww1Ngh6Q2v8lqQpQmAd1jQ==Ssc2Vnkkal6v2Sv4";
        if(!API_KEY) throw new GraphQLError("API NINJA invalid");

        const url1 = `https://api.api-ninjas.com/v1/geocoding?city=${parent.ciudad}&country=${parent.pais}`;
        const data1 = await fetch(url1, {
          headers: {
            'X-Api-Key': API_KEY
          },
        });
        if(data1.status !== 200) throw new GraphQLError("API Ninja error1.");
        const geo: APIGeo[] = await data1.json();
        const lat = geo[0].latitude;
        const lon = geo[0].longitude;

        const url = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`;
        const data = await fetch(url, {
          headers: {
            'X-Api-Key': API_KEY
          },
        });
        if(data.status !== 200) throw new GraphQLError("API Ninja error2.");

        const res: APIWeather = await data.json();
        return res.temp
      }
    },
};  