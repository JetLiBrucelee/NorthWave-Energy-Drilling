import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColors } from "@/hooks/useColors";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  year: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  highlight: string;
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Deepwater Rig Alpha",
    location: "North Sea",
    category: "Drilling",
    year: "2024",
    description:
      "Sunset operations at 3,200m water depth using semi-submersible rig. Delivered 4 production wells ahead of schedule.",
    icon: "oil-temperature",
    highlight: "3,200m depth",
  },
  {
    id: "2",
    title: "Saturation Dive Bell",
    location: "Gulf of Mexico",
    category: "Subsea",
    year: "2024",
    description:
      "Saturation dive bell deployment for critical subsea infrastructure inspection and repair at 280m depth.",
    icon: "diving-scuba",
    highlight: "280m depth",
  },
  {
    id: "3",
    title: "Supply Vessel Transit",
    location: "North Sea",
    category: "Logistics",
    year: "2023",
    description:
      "DP3 supply vessel operations in force-8 conditions supporting a multi-rig campaign across UK waters.",
    icon: "ferry",
    highlight: "Force-8 ops",
  },
  {
    id: "4",
    title: "Pipeline Laying Op",
    location: "Gulf of Alaska",
    category: "SURF",
    year: "2023",
    description:
      "Subsea flowline installation across 120km at sub-Arctic conditions using a J-lay vessel with real-time ROV monitoring.",
    icon: "pipe-leak",
    highlight: "120km flowline",
  },
  {
    id: "5",
    title: "Platform Overhaul",
    location: "North Sea",
    category: "Maintenance",
    year: "2022",
    description:
      "Complete structural reinforcement and anti-corrosion campaign on a 30-year-old fixed platform to NORSOK standards.",
    icon: "domain",
    highlight: "NORSOK certified",
  },
  {
    id: "6",
    title: "Well Completion Campaign",
    location: "Gulf of Mexico",
    category: "Completion",
    year: "2022",
    description:
      "12-well completion campaign including casing, cementing, and perforation. All wells brought online within budget.",
    icon: "check-circle-outline",
    highlight: "12 wells",
  },
];

const CATEGORIES = ["All", "Drilling", "Subsea", "SURF", "Maintenance", "Completion", "Logistics"];

const STATS = [
  { value: "25+", label: "Active Projects" },
  { value: "3", label: "Regions" },
  { value: "99.2%", label: "Safety Record" },
];

export default function ProjectsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const isWeb = Platform.OS === "web";
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContent: {
      paddingTop: isWeb ? 67 + 16 : insets.top + 16,
      paddingBottom: isWeb ? 34 + 100 : 100,
    },
    header: {
      paddingHorizontal: 16,
      marginBottom: 20,
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
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: "row",
      gap: 10,
      marginBottom: 4,
    },
    statBox: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      alignItems: "center",
    },
    statValue: {
      fontSize: 20,
      fontWeight: "700" as const,
      color: colors.primary,
      fontFamily: "Inter_700Bold",
    },
    statLabel: {
      fontSize: 11,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      textAlign: "center",
      marginTop: 2,
    },
    filterRow: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    filterScroll: {
      flexDirection: "row",
      gap: 8,
    },
    filterChip: {
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 999,
      borderWidth: 1,
    },
    filterChipActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterChipInactive: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    filterChipText: {
      fontSize: 13,
      fontFamily: "Inter_500Medium",
      fontWeight: "500" as const,
    },
    filterChipTextActive: {
      color: colors.primaryForeground,
    },
    filterChipTextInactive: {
      color: colors.mutedForeground,
    },
    projectsList: {
      paddingHorizontal: 16,
      gap: 12,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: colors.radius,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    cardTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: colors.radius,
      backgroundColor: colors.primary + "20",
      alignItems: "center",
      justifyContent: "center",
    },
    cardTitleGroup: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 15,
      fontWeight: "600" as const,
      color: colors.foreground,
      fontFamily: "Inter_600SemiBold",
    },
    cardMeta: {
      fontSize: 12,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      marginTop: 2,
    },
    cardBody: {
      padding: 16,
    },
    cardDescription: {
      fontSize: 13,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
      lineHeight: 19,
      marginBottom: 10,
    },
    highlightRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    highlightText: {
      fontSize: 12,
      color: colors.primary,
      fontFamily: "Inter_600SemiBold",
      fontWeight: "600" as const,
    },
    emptyState: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 60,
      gap: 12,
    },
    emptyText: {
      fontSize: 15,
      color: colors.mutedForeground,
      fontFamily: "Inter_400Regular",
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Operation Gallery</Text>
          <Text style={styles.headerTitle}>Our Projects</Text>
          <View style={styles.statsRow}>
            {STATS.map((s) => (
              <View key={s.label} style={styles.statBox}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.filterRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.filterChip,
                  activeCategory === cat
                    ? styles.filterChipActive
                    : styles.filterChipInactive,
                ]}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    activeCategory === cat
                      ? styles.filterChipTextActive
                      : styles.filterChipTextInactive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.projectsList}>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="inbox" size={32} color={colors.mutedForeground} />
              <Text style={styles.emptyText}>No projects in this category</Text>
            </View>
          ) : (
            filtered.map((project) => (
              <View key={project.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.iconWrap}>
                    <MaterialCommunityIcons
                      name={project.icon}
                      size={22}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.cardTitleGroup}>
                    <Text style={styles.cardTitle}>{project.title}</Text>
                    <Text style={styles.cardMeta}>
                      {project.location} · {project.year} · {project.category}
                    </Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardDescription}>
                    {project.description}
                  </Text>
                  <View style={styles.highlightRow}>
                    <Feather name="zap" size={12} color={colors.primary} />
                    <Text style={styles.highlightText}>{project.highlight}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
