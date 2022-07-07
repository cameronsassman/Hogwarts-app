import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../constants/styles';

function Houses({navigation}) {
  const [data, setData] = useState();
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    if(data == null) {
      setLoading(true)
      fetch('https://mocki.io/v1/35caad95-18e4-4e88-ba71-680c77bc4578')
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
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {data?.map((house) => {
          return (
            <View style={styles.container} key={house.id}>
              <View style={styles.content}>
                <View style={styles.card1}>
                  <Image 
                    style={styles.mrs}
                    source={house.uri ? { uri: house.uri } : require('../../assets/Hogwarts/hogwarts.png')}
                  />
                  <Text style={styles.textTitleImg}>Name:</Text>
                  <Text style={styles.textContentImg}>{house.name}</Text>

                  <Text style={styles.textTitleImg}>Head of house:</Text>
                  <Text style={styles.textContentImg}>{house.heads[0].firstName} {house.heads[0].lastName}</Text>
                </View>
                <View style={styles.card2}>
                  <Text style={styles.textTitle}>Animal:</Text>
                  <Text style={styles.textContent}>{house.animal}</Text>

                  <Text style={styles.textTitle}>House founder:</Text>
                  <Text style={styles.textContent}>{house.founder}</Text>

                  <Text style={styles.textTitle}>House ghost:</Text>
                  <Text style={styles.textContent}>{house.ghost}</Text>

                  <Text style={styles.textTitle}>Common room:</Text>
                  <Text style={styles.textContent}>{house.commonRoom}</Text>

                  <Text style={styles.textTitle}>House traits:</Text>
                  <Text style={styles.textContent}>{house.traits[0].name}</Text>
                  <Text style={styles.textContent}>{house.traits[1].name}</Text>
                  <Text style={styles.textContent}>{house.traits[2].name}</Text>
                  <Text style={styles.textContent}>{house.traits[3].name}</Text>
                  <Text style={styles.textContent}>{house.traits[4].name}</Text>
                  <Text style={styles.textContent}>{house.traits[5].name}</Text>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Houses

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary50
},

content: {
    width: '85%',
    height: 350,
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