import React from 'react';
import Tree from 'react-d3-tree';
import { CustomNodeElementProps } from 'react-d3-tree';

import './MemberTree.css';
import MemberService from '../services/MemberService';
import { useCenteredTree } from '../utils/TreeHelpers';
import MemberData from '../interfaces/Member';

const containerStyles = {
  width: "100vw",
  height: "100vh"
};

const memberChart: MemberData = {
  name: 'Big-Little Tree',
  children: MemberService.getAll()
};

const createNameToImageMap = (chart: MemberData): Record<string, string> => {
  const map: Record<string, string> = {};

  const addToMap = (node: MemberData) => {
    if (node.name && node.portrait) {
      map[node.name] = node.portrait;
    }
    if (node.children) {
      node.children.forEach(addToMap);
    }
  };

  addToMap(chart);
  return map;
};

const nameToImageMap = createNameToImageMap(memberChart);


const renderRectSvgNode = (props: CustomNodeElementProps) => {
  const imageUrl = nameToImageMap[props.nodeDatum.name];
  return (
    <g onClick={props.toggleNode} >
      <circle r={30} fill="#2F3A4A"/>
      {imageUrl && (
        <image
          href={imageUrl}
          x={-25}
          y={-25}
          height={50}
          width={50}
          clipPath="url(#circleClip)"
        />
      )}
      <clipPath id="circleClip">
        <circle r={25} cx={0} cy={0} />
      </clipPath>
      <text fill="#000000" fontWeight="lighter" fontSize="18px" x={35} dy={5}>
        {props.nodeDatum.name}
      </text>
    </g>
  )
};

export default function MemberTree() {
  const [translate, containerRef] = useCenteredTree();

  return (
    <div style={containerStyles} ref={containerRef}>
      <Tree
        data={memberChart}
        translate={translate}
        renderCustomNodeElement={renderRectSvgNode}
        orientation="vertical"
        dimensions={{ width: translate.x * 2, height: translate.y * 5 }}
        collapsible={true}
        initialDepth={1}
        depthFactor={200}
        nodeSize={{ x: 200, y: 200 }}
        pathFunc="step"
      />
    </div>
  );
}
