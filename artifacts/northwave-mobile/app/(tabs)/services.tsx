import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface Service {
  id: string;
  title: string;
  description: string;
  details: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const SERVICES: Service[] = [
  {
    id: "1",
    title: "Directional Drilling",
    description: "Precision-guided subsurface navigation",
    details:
      "Rotary steerable systems (RSS) and measurement-while-drilling (MWD) tools delivering pinpoint accuracy in complex geological formations.",
    icon: "rotate-3d-variant",
  },
  {
    id: "2",
    title: "Well Completion",
    description: "End-to-end completion services",
    details:
      "Full suite including casing, cementing, perforation, and stimulation to maximize reservoir performance and longevity.",
    icon: "pipe",
  },
  {
    id: "3",
    title: "Platform Maintenance",
    description: "Active rig structural integrity",
    details:
      "Structural reinforcements, anti-corrosion treatments, and heavy-machinery overhauls on active rigs to NORSOK and API standards.",
    icon: "wrench-cog",
  },
  {
    id: "4",
    title: "Subsea Inspection",
    description: "Deep infrastructure monitoring",
    details:
      "ROV and saturation diver-led inspections for subsea infrastructure at depths exceeding 300m.",
    icon: "magnify-scan",
  },
  {
    id: "5",
    title: "Pipeline & SURF",
    description: "Subsea installation operations",
    details:
      "Subsea umbilical, riser, and flowline (SURF) installation using DP2/DP3 vessels in the harshest offshore environments.",
    icon: "wave",
  },
  {
    id: "6",
    title: "Equipment Rental",
    description: "Premium offshore equipment",
    details:
      "Leasing of blowout preventers (BOPs), top drives, and offshore cranes from Cameron, NOV, and Liebherr.",
    icon: "crane",
  },
];

export default function ServicesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingTop: isWeb ? 67 + 16 : insets.top + 16,
      paddingHorizontal: 16,
      paddingBottom: isWeb ? 34 + 100 : 100,
    },
    header: {
      marginBottom: 24,
    },
    headerLabel: {
      fontSize: 12,
      fontWeight: "600" as const,
      letterSpacing: 2,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      marginBottom: 6,
      textTransform: "uppercase",
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: colors.foreground,
      fontFamily: "Inter_700Bold",
      lineHeight: 34,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      marginBottom: 12,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 16,
    },
    iconWrap: {
      width: 48,
      height: 48,
      borderRadius: colors.radius,
      backgroundColor: colors.primary + "20",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600" as const,
      color: colors.foreground,
      fontFamily: "Inter_600SemiBold",
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 13,
      color: colors.primary,
      fontFamily: "Inter_500Medium",
      marginBottom: 8,
    },
    cardDetail: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      lineHeight: 19,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerLabel}>What We Do</Text>
          <Text style={styles.headerTitle}>Our Services</Text>
        </View>

        {SERVICES.map((service) => (
          <View key={service.id} style={styles.card}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name={service.icon}
                size={24}
                color={colors.primary}
              />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{service.title}</Text>
              <Text style={styles.cardSubtitle}>{service.description}</Text>
              <Text style={styles.cardDetail}>{service.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
