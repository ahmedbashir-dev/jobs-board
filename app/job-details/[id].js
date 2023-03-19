import React from "react";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router";
import { useState, useCallback } from "react";
import {
	Company,
	JobAbout,
	JobFooter,
	JobTabs,
	ScreenHeaderBtn,
	Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

const tabs = ['About','Qualifications','Responsibilities'];

const JobDetails = () => {
	const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0]);
	const params = useSearchParams();
	const router = useRouter();
	const { data, isLoading, error, refetch } = useFetch("job-details", {
		job_id: params.id,
	});

    const displayTabContent = (activeTab)=>{
        switch (activeTab){
            case 'Qualifications':
                return <Specifics title="Qualifications"
                            points={data.at(0)?.job_highlights?.Qualifications ?? ['N/A']}
                />
            case 'About':
                return <JobAbout info = {data.at(0)?.job_description ?? "No data available"} />
            case 'Responsibilities':
                return <Specifics title="Responsibilities"
                points={data.at(0)?.job_highlights?.Responsibilities ?? ['N/A']} />
            default:
                break;
        }
    }

	const handleRefresh = () => {};
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: COLORS.lightWhite,
			}}
		>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: COLORS.lightWhite },
					headerShadowVisible: false,
					headerBackVisible: false,
					headerLeft: () => (
						<ScreenHeaderBtn
							iconUrl={icons.left}
							dimension="60%"
							handlePress={() => router.back()}
						/>
					),
					headerRight: () => (
						<ScreenHeaderBtn
							iconUrl={icons.share}
							dimension="60%"
						/>
					),
					headerTitle: "",
				}}
			/>
			<>
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={handleRefresh}
						/>
					}
				>
					{isLoading ? (
						<ActivityIndicator size="large" />
					) : error ? (
						<Text>Something went wrong</Text>
					) : data.length === 0 ? (
						<Text>No data</Text>
					) : (
						<View
							style={{
								padding: SIZES.medium,
								paddingBottom: 100,
							}}
						>

                            <Company
                                companyLogo = {data.at(0).employer_logo}
                                jobTitle = {data.at(0).job_title}
                                companyName = {data.at(0).employer_name}
                                location = {data.at(0).job_country}
                            />
                            <JobTabs 
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}

                            />

                            {displayTabContent(activeTab)}

                        </View>
					)}
				</ScrollView>
			</>
		</SafeAreaView>
	);
};

export default JobDetails;
