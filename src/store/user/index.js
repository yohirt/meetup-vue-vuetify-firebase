import * as firebase from 'firebase'

export default{
    state: {
        
        user: null,

    },
    mutations: {
        registerUserForMeetup(state, payload) {
            // console.log('Odpalona registerUserForMeetup');
            const id = payload.id
            if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            // console.log('state.user.registeredMeetups =>' + state.user.registeredMeetups)
            state.user.fbKeys[id] = payload.fbKey
            // console.log('payload.fbKey =>' + payload.fbKey)
            // console.log('state.user.fbKeys[id] =>' + state.user.fbKeys[id])
        },
        unregisterUserFromMeetup(state, payload) {
            // console.log('Odpalona unregisterUserFromMeetup');
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => { meetup.id === payload }, 1)
            )
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
       
        setUser(state, payload) {
            // console.log('index - setUser paylod->',payload);
            state.user = payload
        },
 
    },
    actions: {
        registerUserForMeetup({ commit, getters }, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload).then(data => {
                commit('setLoading', false)
                commit('registerUserForMeetup', { id: payload, fbKey: data.key })

                // commit(')
            }).catch(error => {
                console.log(error);
                commit('setLoading', false)

            })

        },
        unregisterUserFromMeetup({ getters, commit }, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbKeys) {
                console.log('brak fbKeys');
                commit('setLoading', false)
                return
            }
            const fbKey = user.fbKeys[payload] //payload = id
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey).remove().then(() => {
                this.commit('setLoading', false)
                this.commit('unregisterUserFromMeetup', payload)
            }).catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        
       
        signUserUp({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(

                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
                    }

                    commit('setUser', newUser)
                }
            ).catch(function (error) {
                // Handle Errors here.
                commit('setLoading', false)
                commit('setError', error)
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("signUserUp -> " + errorCode)
                console.log('signUserUp ->' + errorMessage)
            });
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.user.uid,
                        registeredMeetups: [],
                        fbKeys: {}
                    }
                    // var userTest = firebase.auth().currentUser;
                    // console.log('userTest ' + userTest.uid)
                    // console.log('user.email' + user.user.email)
                    commit('setUser', newUser)
                }
            ).catch(function (error) {
                // Handle Errors here.
                commit('setLoading', false)
                commit('setError', error)

                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
                // ...
            });
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })

        },
        fetchUserData({ commit, getters }) {
            commit('setLoading', true)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
                .then(data => {
                    const valuesPairs = data.val()
                    let registeredMeetups = []
                    let swappedPairs = {}
                    //  console.log(values)
                    for (let index in valuesPairs) {
                        registeredMeetups.push(valuesPairs[index])
                        swappedPairs[index] = valuesPairs[index]
                        // swappedPairs[valuesPairs[index]] = index

                    }
                    // console.log(registeredMeetups);
                    // console.log( 'swappedPairs');
                    // console.log( swappedPairs);
                    const updatedUser = {
                        id: getters.user.id,
                        registeredMeetups: registeredMeetups,
                        fbKeys: swappedPairs
                    }
                    commit('setUser', updatedUser)
                    commit('setLoading', false)
                }).catch(error => {
                    console.log(error);
                    commit('setLoading', false)
                })
        },

        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },

    getters: {
       
        user(state) {
            // console.log('state.user =>' + state.user.registeredMeetups)
            return state.user
        },
  

    }
}