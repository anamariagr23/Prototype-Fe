// components/StatusUpdateModal.tsx
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { ApplicationStatus, APPLICATION_STATUSES } from '../types/CompanyApplications';

interface StatusUpdateModalProps {
    show: boolean;
    onHide: () => void;
    currentStatus: string;
    onUpdateStatus: (newStatus: ApplicationStatus) => Promise<void>;
    applicationId: number;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
    show,
    onHide,
    currentStatus,
    onUpdateStatus,
    applicationId
}) => {
    const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(currentStatus as ApplicationStatus);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsUpdating(true);

        try {
            await onUpdateStatus(selectedStatus);
            onHide();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    // Reset state when modal closes
    const handleClose = () => {
        setSelectedStatus(currentStatus as ApplicationStatus);
        setError(null);
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Application Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-3">
                        Update the status for application #{applicationId}
                    </p>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                            disabled={isUpdating}
                        >
                            {APPLICATION_STATUSES.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} disabled={isUpdating}>
                        Cancel
                    </Button>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={isUpdating || selectedStatus === currentStatus}
                    >
                        {isUpdating ? 'Updating...' : 'Update Status'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default StatusUpdateModal;