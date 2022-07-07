import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { colors } from '../../constants/styles';

function Creatures() {
  const [data, setData] = useState();
  const[loading,setLoading] = useState(false)

  useEffect(() => {
    if(data == null) {
      setLoading(true)
      fetch('https://harry-potter-open-api.herokuapp.com/api/v1/creatures')
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
        {data?.data?.map((creature) => {
          return (
            <View style={styles.container} key={creature.id}>
              <View style={styles.content}>
                <View style={styles.card1}>
                  <Image 
                    style={styles.mrs}
                    source={creature.attributes.img ? { uri: creature.attributes.img } : require('../../assets/Hogwarts/hogwarts.png')}
                  />
                  <Text style={styles.textTitleImg}>Name:</Text>
                  <Text style={styles.textContentImg}>{creature.attributes.name}</Text>
                </View>
                <View style={styles.card2}>
                  <Text style={styles.textTitle}>Skin colour:</Text>
                  <Text style={styles.textContent}>{creature.attributes.skin_color}</Text>

                  <Text style={styles.textTitle}>Eye colour:</Text>
                  <Text style={styles.textContent}>{creature.attributes.eye_color}</Text>

                  <Text style={styles.textTitle}>Mortality:</Text>
                  <Text style={styles.textContent}>{creature.attributes.mortality}</Text>

                  <Text style={styles.textTitle}>Relation:</Text>
                  <Text style={styles.textContent}>{creature.attributes.related_to}</Text>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Creatures

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary50
},

content: {
    width: '85%',
    height: 285,
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
    width: 180
},

card2: {
    width: 200,
    paddingHorizontal: 20
},

mrs: {
    width: '100%',
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
    fontSize: 16,
    marginTop: 10,
    marginStart: 10
},

textContentImg: {
    color: colors.primary300,
    fontWeight: '300',
    fontSize: 16,
    marginStart: 10
},
loader: {
  paddingTop: 220,
  paddingHorizontal: 12
}
});
