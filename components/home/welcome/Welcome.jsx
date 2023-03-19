import { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { icons, SIZES } from "../../../constants";
import styles from "./welcome.style";

const jobTypes = ["Full-time", "Part-time", "Contractor"]

const Welcome = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
	return (
		<View>
			<View style={styles.container}>
        <Text style={styles.userName}>Hello Ahmed!</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput 
            style={styles.searchInput}
            value={searchTerm}
            clearButtonMode="while-editing"
            inputMode="search"
            placeholder="What are you looking for?"
            onChangeText={(text)=>{setSearchTerm(text)}}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
          <Image 
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

		</View>
	);
};

export default Welcome;
