const url = import.meta.env.VITE_BACKEND_URL
const searchMatchServices = {};

// Trae la información de usuario autentificado
searchMatchServices.getUserInfo = async () => {
    try {
        const resp = await fetch(url + '/api/private', {
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!resp.ok) throw Error('Something went wrong')
        const data = await resp.json()
        console.log(data)
        localStorage.setItem('user',JSON.stringify(data.user))
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}

//Trae la infomación de la lista de los ususarios para usarlo en el match
searchMatchServices.getMatchProfiles = async () => {
    try {
        const resp = await fetch(url + '/api/profiles', {
            headers:{
                'Content-Type':'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!resp.ok) throw Error('Failed to fetch match profiles')
        const data = await resp.json()
        console.log(data)
        localStorage.setItem('profile',JSON.stringify(data.profile))
        return data
    } catch (error) {
        console.log(error)
        return error
    }
}



export default searchMatchServices