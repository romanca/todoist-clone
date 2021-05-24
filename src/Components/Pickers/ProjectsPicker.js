import React from "react";
import Icon from "../../shared/Icon";
import styled from "styled-components";
import useVisibiltyState from "../../hooks/useVisibiltyState";
import { useDefaultTodos } from "../../hooks/selectors";

const ProjectsPickerButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${(props) => props.theme.spaces[5]};
  padding: ${(props) => props.theme.spaces[28]}
    ${(props) => props.theme.spaces[43]};
  border: ${(props) => props.theme.spaces[8]} solid
    ${(props) => props.theme.colors.muted9};
  border-radius: ${(props) => props.theme.spaces[1]};
  color: ${(props) => props.theme.colors.text3};
  background-color: transparent;
  outline: none;
  cursor: pointer;
`;
const ProjectPickerIconContainer = styled.div`
  width: ${(props) => props.theme.spaces[12]};
  height: ${(props) => props.theme.spaces[12]};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MainProjectPickersBoxContainer = styled.div`
  background-color: ${(props) => props.theme.colors.background1};
  width: ${(props) => props.theme.spaces[71]};
  height: ${(props) => props.theme.spaces[71]};
  padding: ${(props) => props.theme.spaces[28]};
  border-radius: ${(props) => props.theme.spaces[1]};
  border: ${(props) => props.theme.spaces[8]} solid rgba(0, 0, 0, 0.1);
  box-shadow: ${(props) => props.theme.spaces[28]}
    ${(props) => props.theme.spaces[39]} ${(props) => props.theme.spaces[9]}
    ${(props) => props.theme.spaces[28]} rgb(0 0 0 / 8%);
  position: absolute;
  inset: ${(props) => props.theme.spaces[1]} auto auto
    ${(props) => props.theme.spaces[72]};
  transform: translate(295px, 245px);
  z-index: ${(props) => props.theme.spaces[47]};
`;
const ProjectsPickerBoxPopperContainer = styled.div`
  position: absolute;
  left: ${(props) => props.theme.spaces[28]};
  transform: translate(133px, 0px);
  z-index: ${(props) => props.theme.spaces[47]};
  margin-top: ${(props) => props.theme.spaces[73]};
  height: ${(props) => props.theme.spaces[28]};
  width: ${(props) => props.theme.spaces[28]};
  border: ${(props) => props.theme.spaces[9]} solid transparent;
  border-bottom-color: ${(props) => props.theme.colors.muted7};
`;
const ProjectsPickerBoxPopper = styled.div`
  position: absolute;
  border: ${(props) => props.theme.spaces[2]} solid transparent;
  border-bottom-color: ${(props) => props.theme.colors.background1};
  left: ${(props) => props.theme.spaces[74]};
  top: ${(props) => props.theme.spaces[75]};
`;
const ProjectsPickerInputContainer = styled.div`
  display: flex;
  padding: ${(props) => props.theme.spaces[9]}
    ${(props) => props.theme.spaces[30]};
  align-items: center;
  border-bottom: ${(props) => props.theme.spaces[8]} solid
    ${(props) => props.theme.colors.muted7};
`;
const Input = styled.input`
  border: ${(props) => props.theme.spaces[28]};
  height: ${(props) => props.theme.spaces[12]};
  outline: none;
  background-color: ${(props) => props.theme.colors.background1};
  padding: ${(props) => props.theme.spaces[8]}
    ${(props) => props.theme.spaces[39]};
  display: inline-block;
  text-align: start;
`;
const ProjectsPickerBoxContentContainer = styled.div`
  padding: ${(props) => props.theme.spaces[28]};
  margin: ${(props) => props.theme.spaces[28]};
  max-height: ${(props) => props.theme.spaces[76]};
`;
const ProjectsPickerBoxContentItemContainer = styled.div`
  padding: ${(props) => props.theme.spaces[9]}
    ${(props) => props.theme.spaces[28]};
  margin: ${(props) => props.theme.spaces[28]}
    ${(props) => props.theme.spaces[30]};
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const ProjectsPickerBoxContentItemTitle = styled.span`
  margin: ${(props) => props.theme.spaces[28]}
    ${(props) => props.theme.spaces[30]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  height: ${(props) => props.theme.spaces[12]};
  line-height: ${(props) => props.theme.spaces[77]};
  width: ${(props) => props.theme.spaces[78]};
  color: ${(props) => props.theme.colors.text3};
`;

const ProjectsPicker = () => {
  const { open, handleOpenClose } = useVisibiltyState();
  const [selectedOption, setSelectedOption] = React.useState([]);
  const projects = useDefaultTodos();

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
  };

  return (
    <div>
      <ProjectsPickerButton onClick={handleOpenClose}>
        <ProjectPickerIconContainer>
          <Icon
            name="dot"
            style={{ fontSize: 8 }}
            color="rgb(128, 128, 128);"
          />
        </ProjectPickerIconContainer>
        {selectedOption.title || "Mangoes"}
      </ProjectsPickerButton>
      {open ? (
        <MainProjectPickersBoxContainer>
          <ProjectsPickerBoxPopperContainer>
            <ProjectsPickerBoxPopper></ProjectsPickerBoxPopper>
          </ProjectsPickerBoxPopperContainer>
          <ProjectsPickerInputContainer>
            <Input type="text" placeholder="Type a project" />
          </ProjectsPickerInputContainer>
          <ProjectsPickerBoxContentContainer>
            <ProjectsPickerBoxContentItemContainer>
              <ProjectPickerIconContainer>
                <Icon name="inbox" color="#246fe0" />
              </ProjectPickerIconContainer>
              <ProjectsPickerBoxContentItemTitle>
                Inbox
              </ProjectsPickerBoxContentItemTitle>
            </ProjectsPickerBoxContentItemContainer>
            {Object.values(projects).map((item) => (
              <ProjectsPickerBoxContentItemContainer
                onClick={onOptionClicked(item)}
              >
                <ProjectPickerIconContainer>
                  <Icon name="dot" color="grey" style={{ fontSize: 10 }} />
                </ProjectPickerIconContainer>
                <ProjectsPickerBoxContentItemTitle>
                  {item.title}
                </ProjectsPickerBoxContentItemTitle>
              </ProjectsPickerBoxContentItemContainer>
            ))}
          </ProjectsPickerBoxContentContainer>
        </MainProjectPickersBoxContainer>
      ) : (
        ""
      )}
    </div>
  );
};
export default ProjectsPicker;