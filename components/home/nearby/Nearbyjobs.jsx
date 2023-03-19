import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import useFetch from "../../../hooks/useFetch";
import { COLORS } from "../../../constants";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () => {
	const router = useRouter();
	const [selectedJob, setSelectedJob] = useState(1);
	const { data, isLoading, error, refetch } = useFetch("search", {
		query: "React developer",
		num_pages: 1,
	});

	const handleCardPress = (item) => {
		router.push(`/job-details/${item.job_id}`);
		setSelectedJob(item.job_id);
	};



	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Nearby Jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.cardsContainer}>
				{isLoading ? (
					<ActivityIndicator size="large" color={COLORS.primary} />
				) : error ? (
					<Text>Something went wrong</Text>
				) : (
					data?.map((job) => (
						<NearbyJobCard
							key={`nearby-job-${job?.job_id}`}
							handleNavigate={() =>
								router.push(`/job-details/${job.job_id}`)
							}
							job={job}
						/>
					))
				)}
			</View>
		</View>
	);
};

export default Nearbyjobs;
