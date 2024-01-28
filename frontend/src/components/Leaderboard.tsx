import React from 'react';
import Profile from './Profile';
import {Badge, Box, Center, Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react"; // Import the Profile class
import { StarIcon } from "@chakra-ui/icons";

// Sample profile data
const profilesData: Profile[] = [
  new Profile('user1', 'John', 'john@example.com'),
  new Profile('user2', 'Alice', 'alice@example.com'),
  new Profile('user3', 'Bob', 'bob@example.com'),
];

// Simulate answering questions (for demonstration purposes)
profilesData[0].correctAnswers = 10;
profilesData[0].incorrectAnswers = 0;
profilesData[1].correctAnswers = 0;
profilesData[1].incorrectAnswers = -5;
profilesData[2].correctAnswers = 6;
profilesData[2].incorrectAnswers = 3;

// Calculate scores and sort profiles by score
const sortedProfiles = [...profilesData].filter(profile => profile.correctAnswers + profile.incorrectAnswers > 0).sort((a, b) => b.calculateScore() - a.calculateScore());

// Leaderboard Component
function Leaderboard() {
    return (
        <Center>
            <Box w="full" maxW="lg" p={4} borderWidth="1px" borderRadius="lg" overflow="hidden"> {/* Updated maxW property */}
                <Text fontSize="2xl" mb={4} fontWeight="bold" textAlign="center">AAdvantage Elite Explorers</Text>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Placement</Th>
                            <Th>Username</Th>
                            <Th isNumeric>Score (%)</Th>
                            <Th isNumeric>Correct Answers</Th> {/* New Column Header */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedProfiles.map((profile, index) => (
                            <Tr key={profile.username}>
                                <Td>
                                    {index === 0 ? <StarIcon color="yellow.400" /> : index + 1}
                                </Td>
                                <Td>
                                    <Badge colorScheme={index === 0 ? "green" : "blue"}>
                                        {profile.username}
                                    </Badge>
                                </Td>
                                <Td isNumeric>
                                    {profile.calculateScore().toFixed(2)}%
                                </Td>
                                <Td isNumeric>
                                    {profile.correctAnswers} {/* Displaying Correct Answers */}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Center>
    );
}

export default Leaderboard;