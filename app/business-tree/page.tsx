"use client";

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactFlow, {
    Background,
    Controls,
    Handle,
    MiniMap,
    Position,
    ReactFlowInstance,
    Node,
    Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './business-tree.module.css';

const MINDMAP_DATA = {
    id: 'root',
    title: 'GSAA Global Private Limited',
    description:
        'Central hub of the GSAA ecosystem, connecting identity, operating engine, growth pillars, compliance rules, and token utilities.',
    children: [
        {
            id: 'corporate-identity',
            title: 'Corporate Identity',
            description:
                'Defines GSAA’s positioning, base location, hybrid model, and the industries it serves.',
            children: [
                {
                    id: 'digital-hybrid-ecosystem',
                    title: 'Digital Hybrid Ecosystem',
                    description:
                        'A blended digital model combining engagement, commerce, and reward systems in one ecosystem.',
                },
                {
                    id: 'based-in-agra',
                    title: 'Based in Agra, Uttar Pradesh',
                    description:
                        'Operational presence and identity anchored in Agra, Uttar Pradesh, India.',
                },
                {
                    id: 'decentralized-network-marketing',
                    title: 'Decentralized Network Marketing',
                    description:
                        'Network-driven expansion with distributed participation and structured incentive flows.',
                },
                {
                    id: 'four-major-industries',
                    title: 'Four Major Industries',
                    description:
                        'Core growth verticals used to diversify value creation and member opportunities.',
                    children: [
                        {
                            id: 'entertainment',
                            title: 'Entertainment (G-Flix & Music)',
                            description:
                                'Entertainment vertical powered by G-Flix and music experiences for user engagement.',
                        },
                        {
                            id: 'fintech',
                            title: 'FinTech (GKT Token)',
                            description:
                                'Financial technology layer centered around GKT token-based utility.',
                        },
                        {
                            id: 'social-commerce',
                            title: 'Social Commerce',
                            description:
                                'Commerce interactions supported by social participation and community-led activity.',
                        },
                        {
                            id: 'talent-incubation',
                            title: 'Talent Incubation',
                            description:
                                'Platform support to identify and develop creators, leaders, and emerging contributors.',
                        },
                    ],
                },
            ],
        },
        {
            id: 'mechanical-engine',
            title: 'Mechanical Engine',
            description:
                'The structural mechanics that power matrix behavior, depth, and auto-fill operations.',
            children: [
                {
                    id: 'forced-matrix',
                    title: '3x3 Forced Matrix',
                    description:
                        'A constrained matrix framework designed to drive organized placement and progression.',
                },
                {
                    id: 'depth-20',
                    title: '20-Level Depth',
                    description:
                        'Network depth extends up to 20 levels for structured distribution and tracking.',
                },
                {
                    id: 'auto-fill-logic',
                    title: 'Automated Auto-fill Logic',
                    description:
                        'Rule-based auto-placement logic that continuously supports matrix completeness.',
                },
                {
                    id: 'width-3',
                    title: '3-Width Structure',
                    description:
                        'Each placement layer follows a three-wide design pattern for consistency.',
                },
            ],
        },
        {
            id: 'strategic-pillars',
            title: 'The 4 Strategic Pillars',
            description:
                'Four pillar architecture spanning engagement, performance, leadership, and long-term security.',
            children: [
                {
                    id: 'pillar-1',
                    title: 'Pillar 1: Digital Engagement',
                    description:
                        'Member-facing digital activity streams designed for recurring engagement and utility.',
                    children: [
                        {
                            id: 'watch-to-earn',
                            title: 'Watch to Earn Cashback',
                            description:
                                'Users engage with digital content and receive cashback incentives.',
                        },
                        {
                            id: 'recharge-cashback',
                            title: 'Mobile Recharge Cashback',
                            description:
                                'Recharge actions are linked to cashback-style reward opportunities.',
                        },
                        {
                            id: 'repurchase-income',
                            title: 'Repurchase Income',
                            description:
                                'Repeat ecosystem participation contributes to recurring income potential.',
                        },
                        {
                            id: 'gkt-token-economy',
                            title: 'GKT Token Economy',
                            description:
                                'Token-based internal economy enabling value flow across platform actions.',
                        },
                    ],
                },
                {
                    id: 'pillar-2',
                    title: 'Pillar 2: Network & Performance',
                    description:
                        'Performance-led earnings tied to network activity, contribution, and payout logic.',
                    children: [
                        {
                            id: 'direct-sponsor',
                            title: 'Direct Sponsor Cashback (10%)',
                            description:
                                'Direct sponsorship actions unlock a defined cashback component.',
                        },
                        {
                            id: 'level-cashback',
                            title: 'Level Cashback Income',
                            description:
                                'Income distribution linked to level-wise network outcomes.',
                        },
                        {
                            id: 'matrix-reward',
                            title: 'Matrix Reward Income',
                            description:
                                'Matrix progression contributes to reward accumulation.',
                        },
                        {
                            id: 'field-allowance',
                            title: 'Field Allowance Bonus',
                            description:
                                'Performance in operational field activity yields additional bonus potential.',
                        },
                    ],
                },
                {
                    id: 'pillar-3',
                    title: 'Pillar 3: Leadership & Growth',
                    description:
                        'Leadership development and growth-oriented benefit channels.',
                    children: [
                        {
                            id: 'rank-royalty',
                            title: 'Rank Royalty (Global Pool)',
                            description:
                                'Rank-based royalty participation sourced from a global pool model.',
                        },
                        {
                            id: 'share-holding',
                            title: 'Share Holding Level Income',
                            description:
                                'Structured level income associated with share-holding tiers.',
                        },
                        {
                            id: 'team-booster',
                            title: 'Team Booster Income',
                            description:
                                'Team expansion and momentum can trigger booster income streams.',
                        },
                        {
                            id: 'creator-influencer',
                            title: 'Creator & Influencer Income',
                            description:
                                'Creator and influencer roles are integrated into dedicated earning pathways.',
                        },
                    ],
                },
                {
                    id: 'pillar-4',
                    title: 'Pillar 4: Security & Long-Term',
                    description:
                        'Sustainability safeguards and welfare-focused long-term protections.',
                    children: [
                        {
                            id: 'nominee-fund',
                            title: 'Nominee Fund Royalty',
                            description:
                                'Royalty-linked fund mechanism aligned with nominee-based protection.',
                        },
                        {
                            id: 'accident-casualty',
                            title: 'Accident & Casualty Fund',
                            description:
                                'Protection layer addressing accident and casualty contingencies.',
                        },
                        {
                            id: 'petro-card',
                            title: 'Petro Card Referral Income',
                            description:
                                'Referral-linked incentives associated with petro card participation.',
                        },
                        {
                            id: 'team-growth-rewards',
                            title: 'Team Growth Rewards',
                            description:
                                'Growth milestones across teams drive additional reward allocation.',
                        },
                    ],
                },
            ],
        },
        {
            id: 'rules-compliance',
            title: 'Rules & Compliance',
            description:
                'Governance framework for withdrawals, reward conditions, and system integrity.',
            children: [
                {
                    id: 'withdrawal-logic',
                    title: 'Withdrawal Logic',
                    description:
                        'Rules controlling who can withdraw, when, and applicable deductions.',
                    children: [
                        {
                            id: 'three-direct-ids',
                            title: '3 Direct IDs Compulsory',
                            description:
                                'Withdrawal eligibility requires a minimum of three direct IDs.',
                        },
                        {
                            id: 'fixed-dates',
                            title: 'Fixed Dates (1st & 15th)',
                            description:
                                'Withdrawal cycles are fixed to the 1st and 15th schedule.',
                        },
                        {
                            id: 'deductions-20',
                            title: '20% Total Deductions',
                            description:
                                'A defined total deduction percentage applies at withdrawal settlement.',
                        },
                    ],
                },
                {
                    id: 'reward-unlock-ratio',
                    title: 'Reward Unlock Ratio',
                    description:
                        'Distribution balance rules based on strong-leg and weak-leg contribution.',
                    children: [
                        {
                            id: 'strong-leg',
                            title: 'Strong Leg Max 40%',
                            description:
                                'Strong leg contribution is capped at a maximum threshold.',
                        },
                        {
                            id: 'weak-leg',
                            title: 'Weak Leg Min 60%',
                            description:
                                'Weak leg minimum contribution is required for unlock qualification.',
                        },
                    ],
                },
                {
                    id: 'system-integrity',
                    title: 'System Integrity',
                    description:
                        'Non-manual, automation-led enforcement for consistent operational fairness.',
                    children: [
                        {
                            id: 'rule-based-automation',
                            title: '100% Rule-Based Automation',
                            description:
                                'Core processes execute through deterministic rule-based automation.',
                        },
                        {
                            id: 'no-manual',
                            title: 'No Manual Manipulation',
                            description:
                                'Manual overrides are restricted to preserve transparent logic execution.',
                        },
                        {
                            id: 'mandatory-activation',
                            title: 'Mandatory ID Activation',
                            description:
                                'ID activation is compulsory to ensure compliant participation.',
                        },
                    ],
                },
            ],
        },
        {
            id: 'gkt-tokenomics',
            title: 'GKT Tokenomics',
            description:
                'Token infrastructure and utility layers enabling blockchain-backed operations.',
            children: [
                {
                    id: 'polygon-pos',
                    title: 'Polygon POS Blockchain',
                    description:
                        'Underlying token operations leverage Polygon PoS blockchain infrastructure.',
                },
                {
                    id: 'gkt-minting',
                    title: 'GKT Minting via Activity',
                    description:
                        'Token minting aligns with validated ecosystem activity.',
                },
                {
                    id: 'global-withdrawals',
                    title: 'Instant Global Withdrawals',
                    description:
                        'Withdrawal pathways target near-instant global utility.',
                },
            ],
        },
    ],
};

const HORIZONTAL_GAP = 300;
const VERTICAL_GAP = 110;

const countVisibleLeaves = (node: any, collapsedSet: Set<string>): number => {
    if (!node.children?.length || collapsedSet.has(node.id)) {
        return 1;
    }

    return node.children.reduce(
        (total: number, child: any) => total + countVisibleLeaves(child, collapsedSet),
        0
    );
};

const getCollapsibleNodeIds = (node: any): string[] => {
    if (!node.children?.length) {
        return [];
    }

    return [
        node.id,
        ...node.children.flatMap((child: any) => getCollapsibleNodeIds(child)),
    ];
};

const toSimpleSummary = (text: string) => {
    if (!text) {
        return 'Basic overview is available for this section.';
    }

    const normalized = text.trim();
    if (normalized.length <= 110) {
        return normalized;
    }

    const cut = normalized.slice(0, 107);
    const breakPoint = cut.lastIndexOf(' ');
    return `${cut.slice(0, breakPoint > 70 ? breakPoint : cut.length)}...`;
};

const buildMetadata = (node: any, path: string[] = [], depth = 0): Record<string, any> => {
    const currentPath = [...path, node.title];
    const branchCount = node.children?.length ?? 0;
    const hasChildren = branchCount > 0;
    const map: Record<string, any> = {
        [node.id]: {
            id: node.id,
            title: node.title,
            description: node.description,
            simpleSummary: toSimpleSummary(node.description),
            path: currentPath,
            children:
                node.children?.map((child: any) => ({
                    id: child.id,
                    title: child.title,
                    summary: toSimpleSummary(child.description),
                })) ?? [],
            branchCount,
            hasChildren,
            depth,
            nodeType: node.id === 'root' ? 'Hub' : hasChildren ? 'Section' : 'Leaf',
        },
    };

    if (!node.children?.length) {
        return map;
    }

    return node.children.reduce(
        (acc: any, child: any) => ({ ...acc, ...buildMetadata(child, currentPath, depth + 1) }),
        map
    );
};

const layoutTree = (node: any, collapsedSet: Set<string>, depth: number, cursor: { value: number }) => {
    const isCollapsed = collapsedSet.has(node.id);
    const hasChildren = Boolean(node.children?.length);
    const visibleChildren = hasChildren && !isCollapsed ? node.children : [];

    let yPosition = 0;
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    if (!visibleChildren.length) {
        yPosition = cursor.value * VERTICAL_GAP;
        cursor.value += 1;
    } else {
        const childrenLayouts = visibleChildren.map((child: any) =>
            layoutTree(child, collapsedSet, depth + 1, cursor)
        );

        const firstY = childrenLayouts[0].y;
        const lastY = childrenLayouts[childrenLayouts.length - 1].y;
        yPosition = (firstY + lastY) / 2;

        childrenLayouts.forEach((childLayout: { id: string; nodes: Node[]; edges: Edge[] }) => {
            nodes.push(...childLayout.nodes);
            edges.push(...childLayout.edges);
            edges.push({
                id: `${node.id}-${childLayout.id}`,
                source: node.id,
                target: childLayout.id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: 'rgba(255,255,255,0.15)', strokeWidth: 1.5 },
            });
        });
    }

    nodes.push({
        id: node.id,
        type: 'mindNode',
        position: { x: depth * HORIZONTAL_GAP, y: yPosition },
        draggable: true,
        data: {
            label: node.title,
            isRoot: node.id === 'root',
            hasChildren,
            collapsed: isCollapsed,
            depth,
        },
    });

    return { id: node.id, y: yPosition, nodes, edges };
};

function MindNode({ id, data, selected }: any) {
    return (
        <div
            className={`${styles.mindNode} ${selected ? styles.mindNodeSelected : ''} ${data.isRoot ? styles.mindNodeRoot : ''
                }`}
        >
            {!data.isRoot && (
                <Handle
                    type="target"
                    position={Position.Left}
                    className={styles.mindHandle}
                    isConnectable={false}
                />
            )}
            <div className={styles.mindNodeTitle}>{data.label}</div>
            {data.hasChildren && (
                <button
                    className={styles.mindNodeToggle}
                    onClick={(event) => {
                        event.stopPropagation();
                        data.onToggle(id);
                    }}
                    aria-label={data.collapsed ? 'Expand branch' : 'Collapse branch'}
                >
                    {data.collapsed ? '+' : '−'}
                </button>
            )}
            <Handle
                type="source"
                position={Position.Right}
                className={styles.mindHandle}
                isConnectable={false}
            />
        </div>
    );
}

const STATUS_MESSAGES = [
    "INITIALIZING BUSINESS ENGINE...",
    "MAPPING ECOSYSTEM NODES...",
    "SYNCING GROWTH VECTORS...",
    "CALCULATING MATRIX DEPTH...",
    "VALIDATING TOKEN UTILITY...",
    "GROWTH MATRIX ACTIVE",
];

function BusinessTreeReveal({ onComplete }: { onComplete: () => void }) {
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        if (statusIndex < STATUS_MESSAGES.length - 1) {
            const timer = setTimeout(() => {
                setStatusIndex(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [statusIndex, onComplete]);

    return (
        <motion.div
            className={styles.revealOverlay}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className={styles.revealGrid} />

            <motion.div
                className={styles.revealScanline}
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            <div className={styles.revealContent}>
                <motion.div
                    key={statusIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.revealStatus}
                >
                    {STATUS_MESSAGES[statusIndex]}
                </motion.div>

                <div className={styles.revealBarContainer}>
                    <motion.div
                        className={styles.revealBar}
                        initial={{ width: "0%" }}
                        animate={{ width: `${(statusIndex + 1) * (100 / STATUS_MESSAGES.length)}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            <motion.div
                className={styles.revealPulse}
                animate={{ scale: [1, 15], opacity: [0.5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
        </motion.div>
    );
}

const nodeTypes = { mindNode: MindNode };

export default function BusinessTreePage() {
    const [isRevealed, setIsRevealed] = useState(false);
    const collapsibleIds = useMemo(() => getCollapsibleNodeIds(MINDMAP_DATA), []);
    const [collapsedSet, setCollapsedSet] = useState<Set<string>>(
        () => new Set(collapsibleIds)
    );
    const [selectedNodeId, setSelectedNodeId] = useState('root');
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const [focusNodeId, setFocusNodeId] = useState<string | null>(null);

    const metadata = useMemo(() => buildMetadata(MINDMAP_DATA), []);

    const toggleNode = useCallback((nodeId: string) => {
        setCollapsedSet((prev) => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
        setFocusNodeId(nodeId);
    }, []);

    const expandOnClick = useCallback((nodeId: string) => {
        setCollapsedSet((prev) => {
            if (!prev.has(nodeId)) {
                return prev;
            }

            const next = new Set(prev);
            next.delete(nodeId);
            return next;
        });
        setFocusNodeId(nodeId);
    }, []);

    const { nodes, edges } = useMemo(() => {
        const cursor = { value: 0 };
        const layout = layoutTree(MINDMAP_DATA, collapsedSet, 0, cursor);
        const rootY = layout.nodes.find((node) => node.id === 'root')?.position.y ?? 0;
        const totalLeaves = countVisibleLeaves(MINDMAP_DATA, collapsedSet);

        return {
            nodes: layout.nodes.map((node) => ({
                ...node,
                position: {
                    x: node.position.x,
                    y: node.position.y - rootY + ((totalLeaves - 1) * VERTICAL_GAP) / -2,
                },
                data: {
                    ...node.data,
                    onToggle: toggleNode,
                },
            })),
            edges: layout.edges,
        };
    }, [collapsedSet, toggleNode]);

    const selected = metadata[selectedNodeId];
    const selectedIsCollapsed = selected ? collapsedSet.has(selected.id) : false;

    useEffect(() => {
        if (!reactFlowInstance || !focusNodeId) {
            return;
        }

        const timeoutId = setTimeout(() => {
            // Find the toggled node and its immediate visible children
            const targetNodes = nodes.filter(
                (n) => n.id === focusNodeId || edges.some((e) => e.source === focusNodeId && e.target === n.id)
            );

            if (targetNodes.length > 0) {
                reactFlowInstance.fitView({
                    nodes: targetNodes,
                    padding: 0.35,
                    duration: 800,
                });
            } else {
                // Fallback to global fit
                reactFlowInstance.fitView({
                    padding: 0.2,
                    duration: 600,
                });
            }
            setFocusNodeId(null);
        }, 120);

        return () => clearTimeout(timeoutId);
    }, [reactFlowInstance, focusNodeId, nodes, edges]);

    return (
        <>
            <AnimatePresence mode="wait">
                {!isRevealed && (
                    <BusinessTreeReveal onComplete={() => setIsRevealed(true)} />
                )}
            </AnimatePresence>

            <div className={styles.appShell}>
                <div className={styles.backgroundAtmosphere}>
                    <div className={`${styles.ambientGlow} ${styles.glowSapphire}`} />
                    <div className={`${styles.ambientGlow} ${styles.glowCobalt}`} />
                    <div className={`${styles.ambientGlow} ${styles.glowIndigo}`} />
                    <div className={styles.gridOverlay} />
                </div>
                <div className={styles.mindmapStage}>
                    <div className={styles.mindmapHeader}>
                        <h1>GSAA Business Tree</h1>
                    </div>
                    <div className={styles.mindmapCanvas}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            fitView
                            fitViewOptions={{
                                padding: 0.25,
                                duration: 700
                            }}
                            onInit={setReactFlowInstance}
                            nodesDraggable
                            nodesConnectable={false}
                            elementsSelectable
                            zoomOnPinch
                            zoomOnScroll
                            panOnDrag
                            panOnScroll
                            minZoom={0.25}
                            maxZoom={2}
                            onNodeClick={(_, node) => {
                                setSelectedNodeId(node.id);
                                if (node.data.hasChildren) {
                                    expandOnClick(node.id);
                                } else {
                                    setFocusNodeId(node.id);
                                }
                            }}
                            proOptions={{ hideAttribution: true }}
                            defaultEdgeOptions={{
                                type: 'smoothstep',
                                animated: true,
                                style: { stroke: 'rgba(59, 130, 246, 0.4)', strokeWidth: 2 },
                            }}
                        >
                            <Background color="rgba(59, 130, 246, 0.1)" gap={30} size={1} />
                            <MiniMap
                                pannable
                                zoomable
                                nodeColor={() => '#1d4ed8'}
                                maskColor="rgba(0, 0, 0, 0.6)"
                            />
                            <Controls showInteractive={false} position="bottom-left" />
                        </ReactFlow>
                    </div>
                </div>

                <AnimatePresence>
                    {selectedNodeId && selected && (
                        <motion.aside
                            key={selectedNodeId}
                            initial={{ x: 450, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 450, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={styles.detailPanel}
                        >
                            <div className={styles.detailTop}>
                                <h2>{selected.title}</h2>
                                <button
                                    className={styles.panelClose}
                                    onClick={() => setSelectedNodeId('')}
                                    aria-label="Close details"
                                >
                                    ×
                                </button>
                            </div>

                            <div className={styles.detailPath}>
                                {selected.path.join(' / ')}
                            </div>

                            <p className={styles.detailDescription}>{selected.description}</p>

                            <div className={styles.detailMeta}>
                                <h3>Basic Overview</h3>
                                <p>{selected.simpleSummary}</p>
                            </div>

                            <div className={styles.detailGrid}>
                                <div className={styles.detailChip}>
                                    <h4>Node Type</h4>
                                    <p>{selected.nodeType}</p>
                                </div>
                                <div className={styles.detailChip}>
                                    <h4>Level</h4>
                                    <p>{selected.depth}</p>
                                </div>
                                <div className={styles.detailChip}>
                                    <h4>Branches</h4>
                                    <p>{selected.branchCount}</p>
                                </div>
                                <div className={styles.detailChip}>
                                    <h4>State</h4>
                                    <p>
                                        {selected.hasChildren
                                            ? selectedIsCollapsed
                                                ? 'Collapsed'
                                                : 'Expanded'
                                            : 'Terminal'}
                                    </p>
                                </div>
                            </div>

                            <div className={styles.detailMeta}>
                                <h3>Subsections</h3>
                                {selected.children.length ? (
                                    <ul className={styles.subsectionList}>
                                        {selected.children.map((child: any) => (
                                            <li key={child.id} className={styles.subsectionItem}>
                                                <p className={styles.subsectionTitle}>{child.title}</p>
                                                <p className={styles.subsectionSummary}>{child.summary}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className={styles.emptyText}>No further subsections.</p>
                                )}
                            </div>

                            <div className={styles.detailMeta}>
                                <h3>Navigation Hint</h3>
                                <p className={styles.hintText}>
                                    Click a node to view its matrix depth. Use the toggle button (±) to expand or collapse specific growth vectors.
                                </p>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {!selectedNodeId && (
                    <div className={styles.emptyPanel}>
                        <div className={styles.emptyPanelContent}>
                            <p>Select a node to view its detailed matrix and growth vectors.</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
