import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            { imageUrl: 'https://d-nm.ppstatic.pl/kadr/quizy/k/r/1/7e/98/5c66e9262d707_o,size,624x344,q,100,h,f6e939.jpg?1550248230', id: '1', title: 'Spotkanie - Tarnów', date: "2019-07-12" },
            { imageUrl: 'https://f4fcdn.eu/wp-content/uploads/2018/06/krakowmain.jpg', id: '2', title: 'Spotkanie - Kraków', date: "2019-07-12" },
            { imageUrl: 'https://static.polityka.pl/_resource/res/path/cf/3e/cf3e43e3-b095-43b5-85aa-14f19b3d33c3_f1400x900', id: '3', title: 'Spotkanie - Warszawa', date: "2019-07-12" }
        ],
        user: null,
        loading: false,
        error: null
    },
    mutations: {
        registerUserForMeetup(state, payload) {
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
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => { meetup.id === payload }, 1)
            )
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },
        setLoadedMeetup(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payLoad) {
            // console.log('createmeetup');
            state.loadedMeetups.push(payLoad)
        },
        UpdateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
        setUser(state, payload) {
            // console.log('index - setUser paylod->',payload);
            state.user = payload
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
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
        laodMeetups({ commit }, payload) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            imageUrl: obj[key].imageUrl,
                            description: obj[key].description,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId
                        })

                    }
                    commit('setLoadedMeetup', meetups)
                    commit('setLoading', false)

                })
                .catch((error) => {
                    commit('setLoading', false)
                    console.log(error)
                })
        },
        createMeetup({ commit, getters }, payload) {
            // console.log('acton createMeetup');
            const meetup = {
                title: payload.title,
                description: payload.description,
                imageUrl: '',
                location: payload.location,
                date: payload.date.toISOString(),
                creatorId: getters.user.id,
            }
            let imageUrl
            let key
            // console.log('payload.date -' + payload.date)
            firebase.database().ref('meetups').push(meetup)
                .then(
                    (data) => {
                        key = data.key

                        return key
                    }
                ).then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                    console.log('laodMeetups-> ' + payload.image)

                }).then(fileData => {
                    // imageUrl = fileData.ref.getDownloadURL()
                    // console.log('adasdasdasd==='+imageUrl.toString())
                    // return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
                    imageUrl = fileData.metadata.downloadURL
                    fileData.ref.getDownloadURL().then(urla => {
                        // console.log('urla -> ' + urla)
                        imageUrl = urla
                        // console.log('imageUrl=> ' + imageUrl)
                        // console.log('imageUrl = fileData.. ->' + imageUrl)
                        return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
                    }).then(() => {
                        // console.log('commit index.js createmeetups');
                        commit('createMeetup', { ...meetup, id: key, imageUrl: imageUrl })
                        // console.log('thien imageUrl =>' + imageUrl);

                        // console.log(imageUrl)
                    })
                })
                .catch((error) => {
                    console.log('laodMeetups -> ' + error);
                })
            // firebase rich and store
            // this.state.loadedMeetups.push(payLoad)
        },

        updateMeetupData({ commit }, payload) {
            commit('setLoading', true)
            const updateObject = {}
            if (payload.title) {
                updateObject.title = payload.title
            }
            if (payload.description) {
                updateObject.description = payload.description
            }
            if (payload.date) {
                updateObject.date = payload.date
                // console.log("updateObject.date =" + updateObject.date);
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObject).then(() => {
                commit('setLoading', false)
                commit('UpdateMeetup', payload)

            }).catch(error => {
                console.log(error);
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
        clearError({ commit }) {
            commit('clearError')
        },
        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        }
    },

    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featureMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 4);

        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user(state) {
            // console.log('state.user =>' + state.user.registeredMeetups)
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }

    }
});