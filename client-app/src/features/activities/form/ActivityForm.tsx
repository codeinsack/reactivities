import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityForm = () => {
  const { activityStore } = useStore();
  const {
    loadActivity,
    updateActivity,
    createActivity,
    loading,
    loadingInitial,
  } = activityStore;
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState({
    id: "",
    date: "",
    description: "",
    title: "",
    category: "",
    venue: "",
    city: "",
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setActivity({
      ...activity,
      [name]: value,
    });
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          value={activity.description}
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.category}
          name="category"
          placeholder="Category"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.date}
          name="date"
          type="date"
          placeholder="Date"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.city}
          name="city"
          placeholder="City"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.venue}
          name="venue"
          placeholder="Venue"
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
