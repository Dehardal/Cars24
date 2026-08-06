import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SduiScreen, SduiSection, SduiAction, ChipGroupProps, TenureSelectorProps } from '../schema/types';
import { ComponentRegistry } from './registry';
import { markStart, markEnd } from '../perf/timing';

export const CURRENT_APP_VERSION = 1;

interface SduiRendererProps {
  screen: SduiScreen;
  state: Record<string, any>;
  computed: Record<string, any>;
  onAction: (action: SduiAction) => void;
}

function UnknownComponentFallback({ typeName }: { typeName: string }) {
  return (
    <View style={styles.fallbackContainer}>
      <View style={styles.iconContainer}>
        <Text style={styles.fallbackIcon}>🧩</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fallbackTitle}>New Content Type ({typeName})</Text>
        <Text style={styles.fallbackSubtitle}>
          This section is being updated. Please check back soon or update your app.
        </Text>
      </View>
    </View>
  );
}

// Data Binding Resolver: Maps dynamic bindings in props to state/computed values
function resolveProps(section: SduiSection, state: Record<string, any>, computed: Record<string, any>): Record<string, any> {
  const resolved = { ...section.props };

  if (section.type === 'chip_group') {
    (resolved as ChipGroupProps).selectedId = state.selected_category ?? (section.props as ChipGroupProps).selectedId;
  }

  if (section.type === 'tenure_selector') {
    if (section.props.selectedBind === 'state.tenure_months') {
      (resolved as TenureSelectorProps).selectedMonths = state.tenure_months;
    }
    if (section.props.displayBind === 'computed.emi') {
      const emi = computed.emi ?? 12450;
      (resolved as TenureSelectorProps).emiValue = '₹' + emi.toLocaleString('en-IN');
    }
  }

  return resolved;
}

export default function SduiRenderer({ screen, state, computed, onAction }: SduiRendererProps) {
  // 1. Mark the start of SDUI View Building Phase
  markStart('sdui-view-build');

  const renderedSections = screen.sections.map((section: SduiSection) => {
    if (section.minAppVersion && section.minAppVersion > CURRENT_APP_VERSION) {
      return null;
    }

    const Component = ComponentRegistry[section.type];

    if (!Component) {
      console.warn(`[SDUI Renderer] Warning: Component "${section.type}" not found.`);
      return (
        <View key={section.id} style={styles.sectionWrapper}>
          <UnknownComponentFallback typeName={section.type} />
        </View>
      );
    }

    const resolvedProps = resolveProps(section, state, computed);

    return (
      <View key={section.id} style={styles.sectionWrapper}>
        <Component 
          props={resolvedProps} 
          actions={section.actions}
          onAction={onAction}
        />
      </View>
    );
  });

  // 2. Mark the completion of SDUI View Building Phase
  markEnd('sdui-view-build');

  // To measure TTR (above-the-fold render time) and full page render time:
  // - First 3 items are rendered in a wrapper with onLayout marking above-the-fold
  // - The entire list is rendered inside a wrapper with onLayout marking full-page
  const aboveFoldItems = renderedSections.slice(0, 3);
  const belowFoldItems = renderedSections.slice(3);

  return (
    <View 
      style={styles.container}
      onLayout={() => {
        markEnd('sdui-full-page');
      }}
    >
      <View 
        style={styles.aboveFoldWrapper}
        onLayout={() => {
          markEnd('sdui-above-the-fold-TTR');
        }}
      >
        {aboveFoldItems}
      </View>
      {belowFoldItems}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  aboveFoldWrapper: {
    width: '100%',
  },
  sectionWrapper: {
    marginVertical: 4,
    width: '100%',
  },
  fallbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f4f6',
    borderWidth: 1,
    borderColor: '#e1e2e4',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    gap: 16,
    width: '100%',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e1e2e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackIcon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 2,
  },
  fallbackTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#191c1e',
  },
  fallbackSubtitle: {
    fontSize: 11,
    color: '#4f6073',
    lineHeight: 15,
  },
});
