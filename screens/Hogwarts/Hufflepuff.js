import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../constants/styles';

function Hufflepuff() {
  const [data, setData] = useState(null);
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    if(data == null) {
      setLoading(true)
      fetch('https://hp-api.onrender.com/api/characters/house/hufflepuff')
          .then(respuesta => respuesta.json())
          .then(e => setData(e));
    }
    else {
      setLoading(false)
    }
  }, [data]);

  if(loading){
    return (
      <View style={styles.loader}>
        <Image source={require('../../assets/Hogwarts/deathly-hallows.gif')} />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {data?.map((character, index) => {
          return (
            <View style={styles.container} key={index}>
               <View style={styles.content}>
                  <View style={styles.card1}>
                      <Image 
                        style={styles.mrs} source={character.image ? { uri: character.image } : require('../../assets/Hogwarts/Defaults/HufflepuffDefault.png')}
                      />

                      <Text style={styles.textTitleImg}>Actor:</Text>
                      <Text style={styles.textContentImg}>{character.actor}</Text>
                  </View>
                  <View style={styles.card2}>
                      <Text style={styles.textStyle}>{character.name}</Text>

                      <Text style={styles.textTitle}>Alternate Name:</Text>
                      <Text style={styles.textContent}>{(character.alternate_names).length ? character.alternate_names : <Text>No Alternate Name</Text>}</Text>

                      <Text style={styles.textTitle}>House:</Text>
                      <Text style={styles.textContent}>{character.house}</Text>

                      <Text style={styles.textTitle}>Species:</Text>
                      <Text style={styles.textContent}>{character.species}</Text>

                      <Text style={styles.textTitle}>{character.alive ? <Text style={styles.live} >Live</Text> : <Text style={styles.dead}>Dead</Text>}</Text>

                  </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Hufflepuff

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary50
},

content: {
    width: '85%',
    height: 300,
    marginTop: 20,
    margin: 5,
    borderRadius: 30,
    backgroundColor: colors.primary600,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row'
},

card1: {
    width: 150
},

card2: {
    width: 200,
    paddingHorizontal: 20
},

mrs: {
    width: 150,
    height: 220,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30
},

textStyle: {
    color: colors.primary300,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 5,
},

textTitle: {
    color: colors.primary300,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
},

textContent: {
    color: colors.primary300,
    fontWeight: '300',
    fontSize: 14
},

live: {
    color: 'green'
},

dead: {
    color: 'red'
},

textTitleImg: {
    color: colors.primary300,
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginStart: 10
},

textContentImg: {
    color: colors.primary300,
    fontWeight: '300',
    fontSize: 14,
    marginStart: 10
},
loader: {
  paddingTop: 250
}
});

